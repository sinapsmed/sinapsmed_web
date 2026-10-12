import { GetUserInfo } from "@/actions/user";
import ProfileSection from "@/containers/dashboard/profile/ProfileSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.dashboard.profile')
  return {
      title: t('title'),
  }
}



export default async function ProfilePage() {
  const getUserInfo = await GetUserInfo()
    return(
      <main>
        {
          getUserInfo.data && <ProfileSection userInfo={getUserInfo.data}/>
        }
      </main>
    )
}