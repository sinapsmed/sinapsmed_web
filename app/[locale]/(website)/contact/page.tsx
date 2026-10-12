import { GetAllFAQ } from "@/actions/faq";
import Banner from "@/components/commons/Banner"
import ContactSection from "@/containers/contact/ContactSection"
import FAQSection from "@/containers/home/FAQSection"
import { Path } from "@/types/header";
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.contact')
    return {
        title: t('title'),
        description: t('desc')
    }
}

export default async function ContactPage() {
    const [
        t,
        getAllFAQ
      ] = await Promise.all([
        getTranslations('common.navbar'),
        GetAllFAQ()
      ])
    const routeName = t.raw('routes')[5]
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return (
        <main>
            <Banner paths={paths} />
            <ContactSection />
            {
                getAllFAQ.data && <FAQSection data={getAllFAQ.data} />
            }
        </main>
    )
}