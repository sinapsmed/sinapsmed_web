'use client'
import { Analysis } from '@/types/analysis'
import { faArrowRightToBracket, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Suspense from '../commons/Suspense'
import AnalysisSkeleton from '../skeletons/AnalysisSkeleton'
import { useTranslations } from 'next-intl'
import { CartItem, NewCartItem } from '@/types/cart'
import { ItemType } from '@/types/enum'
import { AddItem, RemoveItem } from '@/actions/cart'
import { usePathname, useRouter } from '@/navigation'
import { useSession } from '../providers/SessionProvider'
import LocaleLink from '../commons/LocaleLink'
import { Alert, Snackbar } from '@mui/material'
import { useTopLoader } from 'nextjs-toploader'

interface Props {
    data: Analysis[],
    pending: boolean,
    cartItems: CartItem[]
    userName: string
}

const AnalysisList = ({ data, pending, cartItems, userName }: Props) => {
    const t = useTranslations('analyses')
    const session = useSession()
    return (
        data.length === 0 ?
            <p className='text-center text-lg'>{t('notfound')}</p> :
            <div className='overflow-y-auto'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>{t('table.name')}</th>
                            <th className='hidden md:table-cell'>{t('table.code')}</th>
                            <th>{t('table.price')}</th>
                            <th className='text-center'>{t('table.add')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Suspense count={10} pending={pending} Component={AnalysisSkeleton}>
                            {
                                data.map((analysis) => {
                                    const itemId = cartItems.find(x => {
                                        if (x.type === ItemType.Analysis) return x.serviceId === analysis.id
                                        else return false
                                    })?.id
                                    return (
                                        <Item userName={userName} itemId={itemId} isLogged={!!session} key={analysis.id} data={analysis} />
                                    )
                                })
                            }
                        </Suspense>
                    </tbody>
                </table>
            </div>
    )
}

interface ItemProps {
    data: Analysis,
    isLogged: boolean,
    itemId?: string,
    userName: string
}

const Item = ({ data, isLogged, itemId, userName }: ItemProps) => {
    const [pending, setPending] = useState(false)
    const router = useRouter()
    const loader = useTopLoader()
    const [open, setOpen] = useState<string | null>(null)
    const addToCart = async () => {
        setPending(true)
        const newItem: NewCartItem = {
            analysisId: data.id,
            count: 1,
            type: ItemType.Analysis,
            userId: "",
            userName
        }

        const result = await AddItem(newItem)
        if (result.success) {
            setOpen('Səbətə uğurla əlavə olundu')
            router.refresh()
        }
        setPending(false)
    }
    const remove = async () => {
        if (!itemId) return
        setPending(true)
        const result = await RemoveItem(itemId)
        if (result.success) {
            setOpen('Səbətdən uğurla silindi')
            router.refresh()
        }
        setPending(false)
    }
    const t = useTranslations('common.navbar')
    const pathname = usePathname()
    return (
        <>

            <Snackbar
                open={!!open}
                autoHideDuration={5000}
                onClose={() => setOpen(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    onClick={() => {
                        loader.start();
                        router.push('/cart');
                    }}

                    onClose={() => setOpen(null)}
                    sx={{ cursor: 'pointer', width: '100%' }}
                >
                    {open}
                </Alert>
            </Snackbar>
            <tr>
                <td>
                    <p>{data.name}</p>
                    <p className='md:hidden text-neutral-600'>(Kod: {data.code})</p>
                </td>
                <td className='hidden md:table-cell'>{data.code}</td>
                <td className='flex gap-x-2 flex-col sm:flex-row'>
                    <span>
                        {data.discounted.toFixed(2)}₼
                    </span>
                    {
                        data.discounted !== data.price && <span className='line-through text-neutral-500'>{data.price.toFixed(2)}₼</span>
                    }
                </td>
                <td className='text-center'>
                    {
                        isLogged ? <button disabled={pending} onClick={itemId ? remove : addToCart} className={`${itemId ? "bg-red-600 hover:bg-red-500" : "bg-yellow-600 hover:bg-yellow-500"} text-white py-2 px-3 font-semibold rounded`}>
                            <FontAwesomeIcon icon={itemId ? faXmark : faPlus} />
                        </button> :
                            <LocaleLink href={`/login?callback=${encodeURIComponent(pathname)}`} className='bg-blue-500 py-2 px-4 rounded text-white font-semibold'>
                                <span className='hidden sm:inline'>
                                    {t('signin')}
                                </span>
                                <span className='sm:hidden'>
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                </span>
                            </LocaleLink>
                    }
                </td>
            </tr>
        </>
    )
}

export default AnalysisList