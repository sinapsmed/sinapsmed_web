import { GetAllExpert } from "@/actions/expert";
import { GetServiceAll } from "@/actions/service";
import Banner from "@/components/commons/Banner";
import FetchProvider from "@/components/providers/FetchProvider";
import ExpertsSection from "@/containers/expert/ExpertsSection";
import { Path } from "@/types/header";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.expert')
    return {
        title: t('title'),
    }
}

interface Props {
    searchParams: SearchParams
}

export default async function ExpertsPage({ searchParams }: Props) {
    const [
        t,
        getAllExpert,
        getServiceAll
    ] = await Promise.all([
        getTranslations('common.navbar'),
        GetAllExpert(searchParams),
        GetServiceAll()
    ])
    const routeName = t.raw('routes')[3]
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]
    return (
        <main>
            <Banner paths={paths} />
            {
                getAllExpert.data && <FetchProvider
                    action={GetAllExpert}
                    initialData={getAllExpert.data}
                    searchParams={{
                        page: (searchParams.page ?? '1') as string,
                        s: (searchParams.s ?? '') as string,
                        spec: (searchParams.spec ?? '') as string,
                    }}>
                    <ExpertsSection services={getServiceAll.data}/>
                </FetchProvider>
            }
        </main>
    )
}