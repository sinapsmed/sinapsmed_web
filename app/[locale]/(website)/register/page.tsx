import RegisterSection from "@/containers/auth/register/RegisterSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.auth.register')
    return{
        title: t('title'),
    }
}

export default function RegisterPage() {
    return(
        <main>
            <RegisterSection/>
        </main>
    )
}