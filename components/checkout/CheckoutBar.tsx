'use client'
import { CartItem } from '@/types/cart'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Paper } from '@mui/material'
import React, { useMemo, useState } from 'react'
import LocaleLink from '../commons/LocaleLink'
import { useTranslations } from 'next-intl'
import { convertCartItems, getCartTotals } from '@/libs/cart'
import { TakeOrder } from '@/actions/checkout'
import { useRouter } from 'next/navigation'
import { Link } from '@/navigation'
import { useTopLoader } from 'nextjs-toploader'

interface Props {
  data: CartItem[],
  couponCode?: string
}

const CheckoutBar = ({ data, couponCode }: Props) => {
  const { totalDiscounted, totalPrice } = getCartTotals(data)
  const converted = useMemo(() => {
    return convertCartItems(data)
  }, [data])
  const t = useTranslations('cart')
  const types = t.raw('list.types')

  const [checked, setChecked] = useState(false)
  const [pending, setPending] = useState(false)
  const router = useRouter()
  const loader = useTopLoader()

  const finishOrder = async () => {
    setPending(true)
    const result = await TakeOrder(couponCode)

    if (result.success) {
      loader.start()
      if (totalDiscounted === 0) router.push(`/payment?STATUS=FullyPaid`)
      else router.push(result.data?.redirectionUrl??'/')
    }
    setPending(false)
  }
  return (
    <Paper elevation={2}>
      {
        couponCode && <Alert severity='success'>{`"${couponCode}" ${t('bar.coupon.used')}`}</Alert>
      }
      <div className='divide-y'>
        <div className='p-4'>
          <div className='flex flex-col sm:flex-row gap-1 items-center mb-5'>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faCartShopping} className='me-1' />
              <h1 className='text-xl font-semibold'>
                {t('bar.checkout.title')}
              </h1>
            </div>
            <LocaleLink href='/cart' className='text-sm text-blue-600'>
              [{t('bar.checkout.edit')}]
            </LocaleLink>
          </div>
          {
            converted.analyses.length > 0 && <h1 className='font-semibold text-lg'>{types[0]}</h1>
          }
          <div className='space-y-1'>
            {
              converted.analyses.map((analysis, index) => (
                <div key={index}>
                  <div className='flex justify-center mb-1'>
                    <Link target='_blank' rel='noopener noreferrer' href={analysis.clinicDetail.mapLink} className='bg-blue-500 rounded text-sm px-1 text-white'>
                      {analysis.clinicDetail.name}
                    </Link>
                  </div>
                  {
                    analysis.items.map((item) => (
                      <div key={item.id} className='flex justify-between items-center italic'>
                        <h1>
                          {item.title}
                        </h1>
                        <span className='font-semibold'>
                          {item.discounted.toFixed(2)}₼
                          {
                            item.discounted !== item.amount && <span className='line-through text-neutral-500 ms-2'>{item.amount.toFixed(2)}₼</span>
                          }
                        </span>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
          {
            converted.appointments.length > 0 && <h1 className='font-semibold text-lg border-t pt-1 mt-1'>{types[1]}</h1>
          }
          <div className='space-y-1'>
            {
              converted.appointments.map((item) => (
                <div key={item.id} className='flex justify-between items-center italic'>
                  <h1>
                    {item.title}
                  </h1>
                  <span className='font-semibold'>
                    {item.discounted.toFixed(2)}₼
                    {
                      item.discounted !== item.amount && <span className='line-through text-neutral-500 ms-2'>{item.amount.toFixed(2)}₼</span>
                    }
                  </span>
                </div>
              ))
            }
          </div>
          {
            data.length === 0 && <p>{t("bar.checkout.empty")}</p>
          }
        </div>
        <div className='p-4'>
          <ul className='space-y-0.5'>
            <li className='flex justify-end gap-2'>
              <span className='font-semibold'>{t('bar.payment.total')}:</span>
              <span>{totalPrice.toFixed(2)}₼</span>
            </li>
            {
              totalDiscounted !== totalPrice &&
              <li className='flex justify-end gap-2 text-red-600'>
                <span className='font-semibold'>{t('bar.payment.discount')}:</span>
                <span>-{(totalPrice - totalDiscounted).toFixed(2)}₼</span>
              </li>
            }
            <li className='flex justify-end gap-2 text-blue-800'>
              <span className='font-semibold'>{t('bar.payment.lastTotal')}:</span>
              <span className='font-bold'>{totalDiscounted.toFixed(2)}₼</span>
            </li>
          </ul>
        </div>
        <div className='p-4'>
          <p className='opacity-80'>
            {t('bar.checkout.info.first')} <LocaleLink href='/privacy-policy' className='text-blue-500'>{t('bar.checkout.info.link')}</LocaleLink>{t('bar.checkout.info.last')}
          </p>
          <div className='space-x-1'>
            <input checked={checked} onChange={() => setChecked(!checked)} type="checkbox" id="accept" required />
            <label htmlFor="accept" className='opacity-80'>{t('bar.checkout.verify.first')} <LocaleLink href='/privacy-policy' className='text-blue-500'>{t('bar.checkout.verify.link')}</LocaleLink>{t('bar.checkout.verify.last')} *</label>
          </div>
        </div>
      </div>
      <button onClick={finishOrder} disabled={!checked || pending} className='bg-blue-500 px-2 py-3 rounded w-full font-semibold text-white'>
        {t(`bar.checkout.${totalDiscounted===0?'finishCheckout':'goCheckout'}`)}
      </button>
    </Paper>
  )
}

export default CheckoutBar