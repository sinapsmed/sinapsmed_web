import React from 'react'
import LocaleLink from '../commons/LocaleLink'
import { useTranslations } from 'next-intl';

interface Props{
    totalPrice: number,
    totalDiscounted: number
}

const CartDetail = ({totalPrice, totalDiscounted}: Props) => {
    const t = useTranslations('cart.bar.payment')
    
    return (
        <div>
            <h1 className='font-semibold text-xl sm:text-2xl'>{t('lastTotal')}</h1>
            <ul className='mt-1 divide-y'>
                <li className='flex justify-between py-1.5'>
                    <span className='font-semibold'>{t('total')}</span>
                    <span>{totalPrice.toFixed(2)}₼</span>
                </li>
                {
                    totalDiscounted!==totalPrice &&
                    <li className='flex justify-between py-1.5 text-red-600'>
                        <span className='font-semibold'>{t('discount')}</span>
                        <span>-{(totalPrice-totalDiscounted).toFixed(2)}₼</span>
                    </li>
                }
                <li className='flex justify-between py-1.5 text-blue-800'>
                    <span className='font-semibold'>{t('lastTotal')}</span>
                    <span className='font-bold'>{totalDiscounted.toFixed(2)}₼</span>
                </li>
                <LocaleLink href='/checkout' className='bg-blue-500 text-white px-5 py-3 rounded-md font-semibold hover:bg-[#6b3e93] w-full text-center inline-block text-sm sm:text-base'>{t('finish')}</LocaleLink>
            </ul>
        </div>
    )
}

export default CartDetail