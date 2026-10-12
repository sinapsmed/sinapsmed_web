'use server';
import { Result } from "@/types/result";
import { getLocale } from "next-intl/server";


export async function tryFetch<T = undefined>(
    url: string | URL | globalThis.Request,
    init?: RequestInit
) {
    const locale = await getLocale()
    try {
        const response = await fetch(url, {
            ...init,
            headers: {
                ...init?.headers,
                'Accept-Language': locale
            }
        });

        const result: Result<T> = await response.json();

        if (!result.success && process.env.NODE_ENV !== 'production') {
            console.dir({
                error: result.message ?? result,
                url,
            }, { depth: Infinity });
        }

        return result;
    } catch (err) {
        const isProd = process.env.NODE_ENV === 'production';
        const message = err instanceof Error ? err.message : String(err);

        if (!isProd) {
            console.error({ error: message, url });
        }


        return {
            success: false,
            message: 'Failed to fetch',
            statusCode: 500,
            errorMessage: null,
            exception: null
        } as Result<T>;
    }
}