import VerifySection from "@/containers/auth/verify/VerifySection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.auth.verify')
    return{
        title: t('title'),
    }
}

export default function VerifyPage() {
    const expired = cookies().get('expired')?.value
    return(
        <main>
            <VerifySection expiredDate={expired}/>
        </main>
    )
}