import ChangePasswordSection from "@/containers/dashboard/change-password/ChangePasswordSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.dashboard.changePass')
  return {
      title: t('title'),
  }
}


export default function ChangePasswordPage() {
    return(
      <main>
        <ChangePasswordSection/>
      </main>
    )
}