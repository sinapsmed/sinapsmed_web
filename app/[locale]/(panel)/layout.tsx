import { GetTotalCount } from "@/actions/cart";
import { GetNotifications } from "@/actions/notification";
import NotificationProvider from "@/components/providers/NotificationProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ContentBox from "@/components/statics/dashboard/ContentBox";
import Sidebar from "@/components/statics/dashboard/Sidebar";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.dashboard')
  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title')
    }
  }
}

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [getTotalCount, getNotifications] = await Promise.all([
    GetTotalCount(),
    GetNotifications(1, 10)
  ])

  return (
    <ReduxProvider>
      <NotificationProvider initialData={getNotifications.data}>
        <Sidebar totalCount={getTotalCount.data ?? 0} />
        <ContentBox>
          {children}
        </ContentBox>
      </NotificationProvider>
    </ReduxProvider>
  );
}
