import Banner from "@/components/commons/Banner";
import PrivacySection from "@/containers/privacy-policy/PrivacySection";
import AgreementSection from "@/containers/user-agreement/AgreementSection";
import { Path } from "@/types/header";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.agreement')
    return{
        title: t('title'),
    }
}


export default function UserAgreementPage() {
    const t = useTranslations('common.footer.links')
    const routeName = t('user_agreement')
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return(
        <main>
            <Banner paths={paths}/>
            <AgreementSection/>
        </main>
    )
}