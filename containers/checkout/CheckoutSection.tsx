import CheckoutBar from '@/components/checkout/CheckoutBar';
import { CartItem } from '@/types/cart';
import React from 'react'

interface Props{
  data: CartItem[],
  couponCode?: string
}

const CheckoutSection = ({data, couponCode}: Props) => {
  return (
    <section id='checkout-section' className='py-10 mx-auto px-4  md:w-[600px]'>
      <CheckoutBar couponCode={couponCode} data={data}/>
    </section>
  )
}

export default CheckoutSection