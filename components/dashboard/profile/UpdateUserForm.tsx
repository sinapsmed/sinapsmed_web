'use client'
import Container from '@/components/statics/dashboard/Container'
import React, { useMemo, useState } from 'react'
import ChangeProfile from './ChangeProfile'
import OutlinedField from '@/components/commons/OutlinedField'
import { countryCodes } from '@/libs/phone'
import RequiredInput from '@/components/commons/RequiredInput'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslations } from 'next-intl'
import SubmitButton from '@/components/commons/SubmitButton'
import { UserInfo } from '@/types/auth'
import useForm from '@/hooks/form'
import { UpdateUserInfo } from '@/actions/user'
import { useRouter } from '@/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Box, Modal } from '@mui/material'
import UpdatePhone from './UpdatePhone'
import NumberField from '@/components/commons/NumberField'
import Error from '@/components/commons/Error'

interface Props {
    userInfo: UserInfo
}

const UpdateUserForm = ({ userInfo }: Props) => {
    const { email, phoneNumber, unicalKey, city, country, dateOfBrith, gender, name, surName, imageUrl } = userInfo
    const router = useRouter()
    const splittedPhone = useMemo(() => {
        const code = countryCodes.find(x => phoneNumber.startsWith(x))
        return [code ?? countryCodes[0], phoneNumber.slice(code?.length)]
    }, [phoneNumber])

    const [changed, setChanged] = useState(false)

    const {action, state, error, pending} = useForm(UpdateUserInfo, ()=>router.refresh())

    const t = useTranslations('dashboard.user.profile')

    const [open, setOpen] = useState(false)
    return (
        <form onSubmit={action} onChange={() => setChanged(true)} className='grid lg:grid-cols-4 gap-3'>
            <Modal open={open} onClose={() => setOpen(false)} className='flex items-center justify-center'>
                <Box>
                    <UpdatePhone close={() => setOpen(false)} email={email} />
                </Box>
            </Modal>
            <Container className='h-fit lg:order-2'>
                <ChangeProfile fullname={`${name} ${surName}`} unikalKey={unicalKey} imageUrl={imageUrl} />
            </Container>
            <Container className='lg:col-span-3'>
                <h1 className='px-2 pb-2 text-lg font-semibold'>{t('title')}</h1>
                <hr />
                <div className='grid sm:grid-cols-2 gap-5 py-5 sm:px-5'>
                    <OutlinedField defaultValue={name} name='name' size='medium' label={t('name')} required />
                    <OutlinedField defaultValue={surName} name='surName' size='medium' label={t('surname')} required />
                    <OutlinedField disabled defaultValue={email} size='medium' label={t('email')} required />
                    <NumberField
                        label={t('editPhone.phone')}
                        disabled
                        input={{
                            value: splittedPhone[1],
                        }}
                        select={{
                            value: splittedPhone[0]
                        }}
                        endAdornment={<button onClick={() => setOpen(true)} type='button' className='absolute text-blue-500 right-3 top-1/2 -translate-y-1/2 text-xl'>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={() => setChanged(true)} maxDate={dayjs()} name='dateOfBrith' value={dateOfBrith ? dayjs(dateOfBrith) : undefined} label={t('birthDate')} />
                    </LocalizationProvider>
                    <div className='space-y-1'>
                        <h1 className='font-semibold'>{`${t('gender')} *`}</h1>
                        <div className='flex gap-3 items-center'>
                            <span>
                                <RequiredInput defaultChecked={gender} title={t('gender')} value={"true"} type="radio" name='gender' /> {t('male')}
                            </span>
                            <span>
                                <RequiredInput defaultChecked={!gender} title={t('gender')} value={"false"} type="radio" name='gender' /> {t('female')}
                            </span>
                        </div>
                    </div>
                    <OutlinedField name='country' size='medium' label={t('country')} defaultValue={country} />
                    <OutlinedField name='city' size='medium' label={t('city')} defaultValue={city} />
                </div>
                <Error error={error}/>
                <input type="hidden" name="phoneNumber" value={phoneNumber} />
                <input type="hidden" name="email" value={email} />
                <div className='flex justify-end'>
                    <SubmitButton state={state} pending={pending} disabled={!changed}>{t('save')}</SubmitButton>
                </div>
            </Container>
        </form>
    )
}

export default UpdateUserForm