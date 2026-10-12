import Banner from "@/components/commons/Banner";
import PrivacySection from "@/containers/privacy-policy/PrivacySection";
import { Path } from "@/types/header";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.privacy')
    return{
        title: t('title'),
    }
}


export default function PrivacyPage() {
    const t = useTranslations('common.footer.links')
    const routeName = t('privacy')
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return(
        <main>
            <Banner paths={paths}/>
            <PrivacySection/>
        </main>
    )
}