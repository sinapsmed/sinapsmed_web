import ForgotPassSection from "@/containers/auth/forgot-password/ForgotPassword";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.auth.forgotPassword')
    return{
        title: t('title'),
    }
}

export default function ForgetPasswordPage() {
    return(
        <main>
            <ForgotPassSection/>
        </main>
    )
}