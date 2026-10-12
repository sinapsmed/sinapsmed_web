import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface Props {
    text: string
}

const CopyBoard = ({ text }: Props) => {
    const [copied, setCopied] = useState(false)

    const copyToBoard = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true)
                const timeout = setTimeout(() => {
                    setCopied(false)
                }, 2000)
                return () => clearTimeout(timeout);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
    return (
        <div className="relative inline-block">
            <button
                type='button'
                onClick={copyToBoard}
                className={`${copied ? 'text-green-600' : 'text-blue-500'}`}
            >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
            </button>

            {copied && (
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg">
                    ✅ Köçürüldü!
                </div>
            )}
        </div>
    )
}

export default CopyBoard