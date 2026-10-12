import { GetBlogList, GetCategoryName } from "@/actions/blog";
import Banner from "@/components/commons/Banner";
import FetchProvider from "@/components/providers/FetchProvider";
import BlogsSection from "@/containers/blogs/BlogsSection";
import { Path } from "@/types/header";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface MetadataProps{ 
    searchParams: SearchParams,
}

export async function generateMetadata({searchParams}: MetadataProps): Promise<Metadata> {
    const {catId} = searchParams
    const getCategoryName = await GetCategoryName(catId)
    return {
        title: getCategoryName.data,
    }
}

interface Props {
    searchParams: SearchParams,
    params: {
        category: string
    }
}

export default async function BlogsPage({ searchParams, params }: Props) {
    const { category } = params
    const getBlogList = await GetBlogList(searchParams)
    if(getBlogList.statusCode===404) notFound()
    const paths: Path[] = [
        {
            title: getBlogList.data?.categoryName ?? '',
        }
    ]
    return (
        <main>
            <Banner paths={paths} mainRoute="blogs" />
            {getBlogList.data &&
                <FetchProvider
                    action={GetBlogList}
                    initialData={getBlogList.data}
                    searchParams={{
                        catId: searchParams.catId as string,
                        page: (searchParams.page ?? '1') as string
                    }}>
                    <BlogsSection category={category} />
                </FetchProvider>
            }
        </main>
    )
}