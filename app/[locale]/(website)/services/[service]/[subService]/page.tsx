import { GetServiceDetail } from "@/actions/service";
import Banner from "@/components/commons/Banner"
import SubServiceSection from "@/containers/services/SubServiceSection"
import { Path } from "@/types/header";
import { SearchParams } from "@/types/query"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface Props{
    searchParams: SearchParams
}

interface MetadataProps{ 
    searchParams: SearchParams,
    params: {
        service: string,
        subService: string,
        locale: string
    }
}

export async function generateMetadata({ params, searchParams }: MetadataProps): Promise<Metadata|undefined> {
    const getServiceDetail = await GetServiceDetail(searchParams.id)
    if(!getServiceDetail.data) return undefined
    const { title, description, imageUrl, id } = getServiceDetail.data
    const t = await getTranslations('metadata.general')
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') ?? 'https';
    const { locale, service, subService } = params;
    const url = `${protocol}://${host}/${locale}/services/${service}/${subService}?id=${id}`;
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            locale: locale,
            url: url,
            siteName: t('title.template'),
            images: {
                url: imageUrl,
                width: 2057,
                height: 1080,
            }
        }
    }
}


export default async function ServicePage({searchParams}: Props) {
    const {id} = searchParams
    const getServiceDetail = await GetServiceDetail(id)
    if(getServiceDetail.statusCode===404) notFound()

    const paths: Path[] = [
        {
            title: getServiceDetail.data?.categoryName?? '',
        },
        {
            title: getServiceDetail.data?.title?? '',
        }
    ]
    return(
        <main>
            <Banner paths={paths} mainRoute="services"/>
            {
                getServiceDetail.data && <SubServiceSection data={getServiceDetail.data}/>
            }
        </main>
    )
}