import { GetAllFAQ } from "@/actions/faq";
import Banner from "@/components/commons/Banner"
import FAQSection from "@/containers/home/FAQSection"
import { Path } from "@/types/header";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata>{
    const t = await getTranslations('metadata.faq')
    return{
        title: t('title'),
    }
}

export default async function FAQPage() {
    const [
        t,
        getAllFAQ
      ] = await Promise.all([
        getTranslations('common.footer.links'),
        GetAllFAQ()
      ])
    const routeName = t('faq')
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return(
        <main>
            <Banner paths={paths}/>
            {
                getAllFAQ.data && <FAQSection data={getAllFAQ.data} />
            }
        </main>
    )
}