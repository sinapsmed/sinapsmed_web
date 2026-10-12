import { GetExpertDetail } from "@/actions/expert"
import ExpertDetailSection from "@/containers/expert/ExpertDetailSection"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface Props {
  params: {
    locale: string
    expertName: string
  }
  searchParams: {
    id?: string
  }
}

export async function generateMetadata({  searchParams }: {  searchParams: Props['searchParams'] }): Promise<Metadata> {

  const result = await GetExpertDetail(searchParams.id || '')
  const t = await getTranslations('metadata.expert')

  return {
    title: `${t('title')} – ${result.data?.fullName || ''}`,
  }
}

export default async function ExpertDetailPage({ params, searchParams }: Props) {
  const id = searchParams.id
  
  if (!id) return notFound()

  const result = await GetExpertDetail(id)
  if (!result.success || !result.data) return notFound()

  const expert = result.data

 
  return (
    <main className="space-y-4 ">
      <ExpertDetailSection expert={expert} /> 
    </main>
  )
}
