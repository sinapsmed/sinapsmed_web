import { GetUserInfo } from "@/actions/user";
import { GetExpertServices, GetExpertWorkingDays } from "@/actions/expert";
import AppointmentSection from "@/containers/expert/AppointmentSection";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.appointment')
    return {
        title: t('title'),
    }
}

interface Props {
    searchParams: SearchParams
}

export default async function AppointmentPage({ searchParams }: Props) {
    const { id, spec } = searchParams
    const [
        getExpertServices,
        getWorkingDays,
        getUserInfo
    ] = await Promise.all([
        GetExpertServices(id, spec),
        GetExpertWorkingDays(id),
        GetUserInfo()
    ])
    return (
        <main>
            {
                getExpertServices &&
                getWorkingDays.data &&
                getUserInfo.data &&
                <AppointmentSection userInfo={getUserInfo.data} workingDays={getWorkingDays.data} expertServiceList={getExpertServices.data} />
            }
        </main>
    )
}