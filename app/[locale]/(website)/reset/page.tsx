import ResetSection from "@/containers/auth/reset/ResetSection";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.auth.reset')
    return{
        title: t('title'),
    }
}

interface Props {
    searchParams: SearchParams
}

export default function ResetPage({searchParams}:Props) {
    const {email, token} = searchParams
    
    if(!email || !token) return notFound()
        
    return(
        <main>
            <ResetSection email={email} token={token}/>
        </main>
    )
}