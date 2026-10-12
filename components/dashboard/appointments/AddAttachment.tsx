'use client'
import { AddAttachmentFile } from '@/actions/file'
import Modal from '@/components/commons/Modal'
import OutlinedField from '@/components/commons/OutlinedField'
import SubmitButton from '@/components/commons/SubmitButton'
import { useRouter } from '@/navigation'
import { faAdd, faPaperclip, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'next/navigation'
import React, { useRef, useState } from 'react'
import useForm from '@/hooks/form'
import Error from '@/components/commons/Error'

const AddAttachment = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { id } = useParams()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setFile(file)
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const clearFile = () => {
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const onSuccess = () => {
        router.refresh()
        setOpen(false)
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const { action, state, error, pending } = useForm(AddAttachmentFile, onSuccess)

    return (
        <div>
            <button
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                onClick={() => setOpen(true)}
            >
                <FontAwesomeIcon icon={faAdd} />
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <form onSubmit={action} className='space-y-2'>
                    <OutlinedField
                        label="Faylın Adı"
                        required
                        name='title'
                    />

                    <input
                        type="file"
                        name='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <input type="hidden" name="id" value={id} />

                    {!file ? (
                        <button
                            type='button'
                            onClick={triggerFileInput}
                            className="text-sm bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition"
                        >
                            <FontAwesomeIcon icon={faPaperclip} className='me-1' /> Fayl əlavə et
                        </button>
                    ) : (
                        <div className="flex items-center justify-between gap-2 bg-gray-100 p-2 rounded">
                            <span className="text-sm line-clamp-1"><FontAwesomeIcon icon={faPaperclip} className='me-1' /> {file.name}</span>
                            <button onClick={clearFile} className="text-red-600 hover:text-red-800">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    )}
                    <Error error={error}/>
                    <div className='grid grid-cols-2 gap-2 font-semibold'>
                        <SubmitButton state={state} pending={pending} className='w-full' disabled={!file}>
                            Təsdiqlə
                        </SubmitButton>
                        <button
                            type='button'
                            className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition"
                            onClick={() => setOpen(false)}
                        >
                            Bağla
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddAttachment
