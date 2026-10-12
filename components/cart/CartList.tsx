'use client'
import { RemoveItem } from '@/actions/cart';
import { CartItem as Item } from '@/types/cart';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Paper } from '@mui/material'
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { useRouter } from '@/navigation';

interface Props {
    cartItems: Item[],
}

const CartList = ({ cartItems }: Props) => {
    const t = useTranslations('cart.list')
    const types = t.raw('types')

    return (
        <Paper elevation={2} className='rounded p-4'>
            <Alert severity="warning">
                {t('warning')}
            </Alert>
            <table className='table table-striped text-sm'>
                <thead>
                    <tr>
                        <th>{t('table.name')}</th>
                        <th>{t('table.price')}</th>
                        <th className='text-center hidden sm:table-cell'>{t('table.remove')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.map((item) => (
                            <CartItem type={types[item.type]} item={item} key={item.id} />
                        ))
                    }
                </tbody>
            </table>
        </Paper>
    )
}

interface CartItemProps {
    item: Item,
    type: string
}

const CartItem = ({ item, type }: CartItemProps) => {
    const [pending, setPending] = useState(false)
    const router = useRouter()
    const remove = async () => {
        setPending(true)
        await RemoveItem(item.id)
        router.refresh()
        setPending(false)
    }

    return (
        <>
            <tr>
                <td>
                    <div className='flex gap-2'>
                        <h1>{item.title}</h1>
                    </div>
                    <p className='text-sm text-indigo-500 font-semibold'>
                        {type}
                    </p>
                </td>
                <td className='flex flex-col gap-1'>
                    {item.discounted.toFixed(2)}₼
                    {item.discounted !== item.amount && <span className='line-through text-neutral-500'>{item.amount.toFixed(2)}₼</span>}
                </td>
                <td className='text-center text-lg hidden sm:table-cell'>
                    <button disabled={pending} onClick={remove} className='text-white bg-red-500 px-5 rounded'>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </td>
            </tr>
            <tr className='sm:hidden w-full'>
                <td colSpan={4} className='w-full border'>
                    <div className='flex justify-center gap-7'>
                        <div className='text-center text-lg text-white bg-red-500 px-5 rounded'>
                            <button disabled={pending} onClick={remove}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default CartList