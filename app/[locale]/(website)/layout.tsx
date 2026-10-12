import type { Metadata } from "next";
import Navbar from "@/components/statics/website/Navbar";
import Footer from "@/components/statics/website/Footer";
import MoveUp from "@/components/statics/website/MoveUp";
import { getTranslations } from "next-intl/server";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { GetServiceRoutes } from "@/actions/service";
import { GetBlogRoutes } from "@/actions/blog";
import { GetTotalCount } from "@/actions/cart";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.general')
  return {
    title: {
      template: `%s | ${t('title.template')}`,
      default: t('title.default')
    },
    description: t('desc'),
  }
}

export default async function MainLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const [
    getTotalCount,
    getServiceRoutes,
    getBlogRoutes,
  ] = await Promise.all([
    GetTotalCount(),
    GetServiceRoutes(),
    GetBlogRoutes(),
  ])

  return (
    <ReduxProvider>
      <Navbar
        totalCount={getTotalCount.data ?? 0}
        blogData={getBlogRoutes.data}
        serviceData={getServiceRoutes.data}
      />
      {children}
      <Footer />
      <MoveUp />
    </ReduxProvider>
  );
}
