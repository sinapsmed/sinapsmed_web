'use client'
import { Result } from '@/types/result';
import { useState, useCallback } from 'react';

export default function useForm<T>(fn: (formData: FormData) => Promise<Result<T>>, onSuccess?: () => Promise<void> | void) {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<Result<T> | null>(null);

    const action = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            setPending(true);
            setError(null);

            const result = await fn(formData);

            setPending(false);
            setState(result)
            if (result) {
                if (!result.success) {
                    setError(result.message ?? null)
                }
                else {
                    await onSuccess?.()
                }
            }
        },
        [fn]
    );

    return { pending, error, state, action };
}