'use client'
import CartBar from '@/components/cart/CartBar'
import CartList from '@/components/cart/CartList'
import LocaleLink from '@/components/commons/LocaleLink';
import { getCartTotals } from '@/libs/cart';
import { CartItem } from '@/types/cart';
import { useTranslations } from 'next-intl';
import React from 'react'

interface Props {
  data: CartItem[],
  couponCode?: string,
  message?: string
  success: boolean
}

const CartSection = ({ data, couponCode, message, success }: Props) => {
  const t = useTranslations('cart')
  const totals = getCartTotals(data)
  return (
    <section id='cart-section' className='sectionBox'>
      {
        totals.totalCount > 0 ?
          <div className='flex flex-col lg:flex-row gap-5'>
            <div className='w-full lg:w-2/3'>
              <CartList cartItems={data} />
            </div>
            <div className='w-full lg:w-1/3'>
              <CartBar totals={totals} couponCode={couponCode} message={message} success={success}/>
            </div>
          </div>
          :
          <div className='text-center grid gap-2 justify-center'>
            <p className='text-xl text-neutral-700'>{t('empty')}</p>
            <div className='flex gap-2 justify-center'>
              <LocaleLink href={'/analyses'} className="py-3 px-4 rounded bg-blue-500 hover:bg-blue-600 font-semibold text-white inline-block">{t('analysis')}</LocaleLink>
              <LocaleLink href={'/experts'} className="py-3 px-4 rounded bg-blue-500 hover:bg-blue-600 font-semibold text-white inline-block">{t('appointment')}</LocaleLink>
            </div>
          </div>
      }
    </section>
  )
}

export default CartSection