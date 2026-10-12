import FilterSection from "@/containers/analyses/filter/FilterSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.analyses')
    return{
        title: t('title'),
    }
}

export default function FilterAnalysesPage() {
    return(
        <main>
            <FilterSection/>
        </main>
    )
}