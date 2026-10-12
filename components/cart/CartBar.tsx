'use client'
import { Alert, Paper } from '@mui/material'
import React, { useState } from 'react'
import CartDetail from './CartDetail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import { useTranslations } from 'next-intl'
import { RemoveAll } from '@/actions/cart'
import CouponCode from './CouponCode'
import { useRouter } from '@/navigation'

interface Props {
  totals: {
    totalCount: number;
    totalPrice: number;
    totalDiscounted: number;
  }
  message?: string
  success: boolean
  couponCode?: string
}

const   CartBar = ({ totals, message, success, couponCode }: Props) => {

  const router = useRouter()
  const [pending, setPending] = useState(false)
  const { totalDiscounted, totalPrice, totalCount } = totals

  const clearCart = async () => {
    setPending(true) 
    await RemoveAll()
    router.refresh()
    setPending(false)
  }
  const t = useTranslations('cart.bar')

  return (
    <Paper elevation={2} className='rounded sticky top-4 p-4'>
      {
        message && <Alert className='mb-2' severity={success ? 'success' : 'error'}>
          {message}
        </Alert>
      }
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold text-xl sm:text-2xl'>{t('count')}: {totalCount}</h1>
        <button disabled={pending} onClick={clearCart} className='text-3xl text-red-500'>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
      </div>
      <hr className='my-3' />
      <CouponCode code={couponCode} success={success} />
      <hr className='my-3' />
      <CartDetail totalPrice={totalPrice} totalDiscounted={totalDiscounted} />
    </Paper>
  )
}

export default CartBar