'use client'

import { alwaysArray } from "@/libs/array";
import { useRouter } from "@/navigation";
import { Result } from "@/types/result";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type Func<T> = (...args: any[]) => Promise<Result<T>>;

export default function useFetch<T>(
    action: Func<T>,
    initialData: T,
    searchParams: { [key: string]: string | string[] }
): [
    T,
    boolean,
    { [key: string]: string | string[] },
    (...args: (string | string[])[]) => Promise<void>
] {
    const [pending, setPending] = useState(false);
    const [state, setState] = useState(initialData);
    const [paramsState, setParamsState] = useState(searchParams);
    const router = useRouter();
    const params = useSearchParams();

    const updateParams = (key: string, value: string | string[]) => {
        const updatedParams = { ...paramsState };
        updatedParams[key] = value;
        setParamsState(updatedParams);
        return updatedParams;
    };

    const updateData = async (params: { [key: string]: string | string[] }) => {
        setPending(true);
        const result = await action(params);
        if (result.data) setState(result.data);
        setPending(false);
    };

    const setQuery = async (...args: (string | string[])[]) => {
        if (args.length % 2 !== 0) {
            throw new Error("setQuery requires an even number of arguments (key, value, key, value, ...)");
        }

        const queries = new URLSearchParams(params.toString());
        let updatedParams = { ...paramsState };

        for (let i = 0; i < args.length; i += 2) {
            const key = args[i] as string;
            const value = args[i + 1] as string | string[];
            const values = alwaysArray(value);

            queries.delete(key);
            values.forEach((v) => queries.append(key, v));

            updatedParams = { ...updatedParams, [key]: values };
        }

        router.push(`?${queries.toString()}`, { scroll: false });

        setParamsState(updatedParams);
        await updateData(updatedParams);
    };

    return [state, pending, paramsState, setQuery];
}
