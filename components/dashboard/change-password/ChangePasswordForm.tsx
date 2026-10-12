'use client'
import { ChangePassword } from '@/actions/auth'
import SubmitButton from '@/components/commons/SubmitButton'
import Container from '@/components/statics/dashboard/Container'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import useForm from '@/hooks/form'
import Error from '@/components/commons/Error'

const ChangePasswordForm = () => {
    const [matchError, setMatchError] = useState<string | null>(null);
    const [passwords, setPasswords] = useState(['', '', ''])
    const {action, state, error, pending} = useForm(ChangePassword, ()=> setPasswords(['', '', '']))

    const handlePasswords = (index: number, value: string) => {
        const changePassword = [...passwords]
        changePassword[index] = value
        setPasswords(changePassword)
        if (changePassword[0] !== changePassword[1]) setMatchError("Şifrələr uyğun gəlmir!")
        else setMatchError(null)
    }

    const t = useTranslations('dashboard.user.changePass')
    return (
        <form onSubmit={action}>
            <Container className='lg:col-span-3'>
                <h1 className='px-2 pb-2 text-lg font-semibold'>{t('title')}</h1>
                <hr />
                <div className='flex flex-col gap-5 py-5 sm:px-5'>
                    <PasswordInput value={passwords[2]} onChange={(value) => handlePasswords(2, value)} label={t('oldPassword')} name='oldPassword' />
                    <PasswordInput value={passwords[0]} onChange={(value) => handlePasswords(0, value)} label={t('newPassword')} name='newPassword' />
                    <PasswordInput value={passwords[1]} onChange={(value) => handlePasswords(1, value)} label={t('confirmPassword')} />
                </div>
                <Error error={matchError}/>
                <Error error={error}/>
                <div className='flex justify-end'>
                    <SubmitButton state={state} pending={pending} disabled={passwords[0]!==passwords[1]}>{t('update')}</SubmitButton>
                </div>
            </Container>
        </form>
    )
}

interface PasswordProps {
    label: string,
    name?: string,
    value?: string,
    disabled?: boolean
    fullWidth?: boolean
    onChange?: (value: string) => void
}

const PasswordInput = ({ label, name, value, onChange, disabled = false, fullWidth = false }: PasswordProps) => {
    const [show, setShow] = useState(false)

    return (
        <FormControl required variant="outlined" className={`w-full ${fullWidth?'':'md:w-2/3 lg:w-1/2'}`}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                autoComplete={name}
                name={name}
                id={name}
                disabled={disabled}
                type={!disabled && show ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <button onClick={() => setShow(!show)} type='button'>
                            <FontAwesomeIcon icon={!disabled && show ? faEye : faEyeSlash} />
                        </button>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export {PasswordInput}
export default ChangePasswordForm