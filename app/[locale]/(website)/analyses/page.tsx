import { GetAnalyses, GetAnalysisCats } from "@/actions/analysis";
import { GetCartItems } from "@/actions/cart";
import Banner from "@/components/commons/Banner";
import FetchProvider from "@/components/providers/FetchProvider";
import AnalysesSection from "@/containers/analyses/AnalysesSection";
import { alwaysArray } from "@/libs/array";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.analyses')
    return {
        title: t('title'),
    }
}

interface Props {
    searchParams: SearchParams
}

export default async function AnalysesPage({ searchParams }: Props) {
    const [
        getAnalyses,
        getCats,
        getCart,
        t,
    ] = await Promise.all([
        GetAnalyses(searchParams),
        GetAnalysisCats(),
        GetCartItems(),
        getTranslations('common.navbar'),
    ])

    const routeName = t.raw('routes')[2]
    const paths = [
        {
            title: routeName,
        }
    ]


    return (
        <main>
            <Banner paths={paths} />
            {getAnalyses.data &&
                <FetchProvider
                    action={GetAnalyses}
                    initialData={getAnalyses.data}
                    searchParams={{
                        cat: alwaysArray(searchParams.cat),
                        page: (searchParams.page ?? '1') as string,
                        s: (searchParams.s ?? '') as string,
                    }}>
                    <AnalysesSection cartItems={getCart.data ?? []} cats={getCats.data} />
                </FetchProvider>
            }
        </main>
    )
}