import Banner from "@/components/commons/Banner";
import AboutSection from "@/containers/about/AboutSection";
import { Path } from "@/types/header";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata')
    return{
        title: t('about.title'),
        description: t('general.desc')
    }
}

export default function AboutPage() {
    const t = useTranslations('common.navbar')
    const routeName = t.raw('routes')[0]
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return(
        <main>
            <Banner paths={paths}/>
            <AboutSection/>
        </main>
    )
}