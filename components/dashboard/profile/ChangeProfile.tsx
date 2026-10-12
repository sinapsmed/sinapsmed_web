'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import CopyBoard from '@/components/commons/CopyBoard'
import { RemoveFile, UploadFile } from '@/actions/file'
import { FileType } from '@/types/enum'
import { CircularProgress } from '@mui/material'

interface Props {
    imageUrl: string
    unikalKey: string
    fullname: string
}

const ChangeProfile = ({ imageUrl, unikalKey, fullname }: Props) => {
    const [preview, setPreview] = useState(imageUrl)
    const [pending, setPending] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = async () => {
        if (preview !== imageUrl) {
            setPreview(imageUrl)
            await RemoveFile(preview)
        }
        else {
            if (inputRef.current) {
                inputRef.current.value = ''
                inputRef.current.click()
            }
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) {
            console.log('No file selected');
            return
        }

        console.log('File selected:', file.name);

        if (!file.type.startsWith('image/')) {
            console.log('Invalid file type');
            alert('Please select a valid image file.')
            return
        }

        const formData = new FormData()
        formData.append('file', file)
        setPending(true)
        const result = await UploadFile(formData, FileType.Users)
        if (result.data) setPreview(result.data)
        setPending(false)
    }

    return (
        <div className='col-span-1 flex flex-center py-6 flex-col'>
            <div className='size-36 sm:size-48 lg:size-36 xl:size-48 relative rounded-full border-8 mb-2'>
                <input
                    type="file"
                    className='hidden'
                    ref={inputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button
                    type='button'
                    className='size-8 z-[1] flex flex-center absolute top-0 right-3 rounded-full bg-white text-black/65 shadow-md'
                    onClick={handleClick}
                >
                    {
                        imageUrl === preview ? <FontAwesomeIcon icon={faPen} /> :
                            <FontAwesomeIcon className='text-red-500' icon={faXmark} />
                    }
                </button>
                {
                    pending && <div className='absolute-center z-[2]'>
                        <CircularProgress />
                    </div>
                }
                <Image src={preview} alt='profile' fill className={`${pending?'opacity-50':''} object-center object-cover rounded-full`}/>
                <input type="hidden" name="imageUrl" value={preview} />
            </div>
            <h1 className='text-center font-semibold'>{fullname}</h1>
            <div className='flex justify-center items-center gap-1'>
                <p className='text-center text-sm opacity-85'>
                    {unikalKey}
                </p>
                <input type="hidden" name="unicalKey" value={unikalKey} />
                <CopyBoard text={unikalKey} />
            </div>
        </div>
    )
}

export default ChangeProfile
