'use client'

import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const MoveUp = () => {
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 80) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const goUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        isVisible && <button
            onClick={goUp}
            className='bg-blue-600 hover:bg-blue-800 shadow-lg size-10 flex flex-center fixed z-[998] bottom-5 right-5 text-white rounded-full'>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    )
}

export default MoveUp