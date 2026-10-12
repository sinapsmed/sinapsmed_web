import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import NotFoundImage from '@/public/404.png'
import LocaleLink from "@/components/commons/LocaleLink";
import Image from "next/image";
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.notFound')
    return {
        title: `404 - ${t('title')}`
    }
}

export default function NotFound() {
    const t = useTranslations('metadata.notFound')
    return (
        <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <section id="not-found" className="sectionBox flex flex-center flex-col gap-2 text-center">
                <Image alt="404-image" src={NotFoundImage} className="w-[200px] sm:w-[300px] h-auto"/>
                <h1 className="text-2xl sm:text-4xl font-semibold">{t('title')}</h1>
                <p className="text-sm sm:text-lg text-neutral-700">{t('desc')}</p>
                <LocaleLink href={'/dashboard'} className="py-3 px-4 rounded bg-blue-500 font-semibold text-white">{t('goBack')} </LocaleLink>
            </section>
        </main>
    );
}