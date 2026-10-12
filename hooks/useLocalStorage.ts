'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T|null, Dispatch<SetStateAction<T|null>>] {
    const [value, setValue] = useState<T|null>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        const fromLocal = () => {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) as T : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            }
        };
        
        setValue(fromLocal);
        setFirstLoad(false);
    }, [initialValue, key]);

    useEffect(() => {
        if (firstLoad) {
            return;
        }

        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.log(error);
        }
    }, [value, firstLoad, key]);

    return [value, setValue];
}