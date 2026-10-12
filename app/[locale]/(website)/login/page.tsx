import LoginSection from "@/containers/auth/login/LoginSection";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.auth.login')
    return{
        title: t('title'),
    }
}

interface Props {
    searchParams: SearchParams
}

export default function RegisterPage({searchParams}:Props) {
    const {registered, callback, warning} = searchParams
    return(
        <main>
            <LoginSection warning={warning} callback={callback} registered={!!registered}/>
        </main>
    )
}