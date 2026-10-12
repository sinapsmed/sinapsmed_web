import { GetBlogComments, GetBlogDetail } from "@/actions/blog";
import Banner from "@/components/commons/Banner";
import CommentProvider from "@/components/providers/CommentProvider";
import BlogDetailSection from "@/containers/blogs/BlogDetailSection";
import CommentSection from "@/containers/blogs/CommentSection";
import { Path } from "@/types/header";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface MetadataProps {
    searchParams: SearchParams,
    params: {
        category: string,
        blogDetail: string
    }
}

export async function generateMetadata({ searchParams, params }: MetadataProps): Promise<Metadata | undefined> {
    const [
        getBlogDetail,
        t,
        locale
    ] = await Promise.all([
        GetBlogDetail(searchParams.id),
        getTranslations('metadata.general'),
        getLocale()
    ])
    if (!getBlogDetail.data) return undefined
    const { name, description, imageUrl, id, creator, categoryName } = getBlogDetail.data
    const headersList = headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') ?? 'https';
    const { category, blogDetail } = params;
    const url = `${protocol}://${host}/${locale}/blogs/${category}/${blogDetail}?id=${id}`;
    return {
        title: name,
        description: description,
        creator: creator,
        category: categoryName,
        openGraph: {
            title: name,
            description: description,
            type: 'article',
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

interface Props {
    searchParams: SearchParams,
    params: {
        category: string
    }
}

export default async function BlogDetailPage({ searchParams, params }: Props) {
    const { id } = searchParams
    const { category } = params
    const [
        getBlogDetail,
        getBlogComments
    ] = await Promise.all([
        GetBlogDetail(id),
        GetBlogComments(id)
    ])
    if (getBlogDetail.statusCode === 404) notFound()

    const paths: Path[] = [
        {
            title: getBlogDetail.data?.categoryName ?? '',
            href: category
        },
        {
            title: getBlogDetail.data?.name ?? '',
        }
    ]
    return (
        <main>
            <Banner paths={paths} mainRoute="blogs" />
            <div className="sectionBox blog space-y-5">
                {getBlogDetail.data && <BlogDetailSection data={getBlogDetail.data} />}
                {getBlogComments.data &&
                    <CommentProvider
                        initialData={getBlogComments.data.data.map((comment) => ({
                            ...comment,
                            replies: [],
                            newReplies: []
                        }))}
                        count={getBlogDetail.data?.commentCount || 0}
                        blogId={id as string}
                    >
                        <CommentSection id={id} pageCount={getBlogComments.data.pageCount} />
                    </CommentProvider>
                }
            </div>
        </main>
    )
}