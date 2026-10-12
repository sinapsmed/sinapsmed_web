import "@/styles/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import TranslationProvider from "@/components/providers/TranslationProvider";
config.autoAddCss = false

import NextTopLoader from 'nextjs-toploader'
import { getMessages } from "next-intl/server";
import { auth } from "@/next-auth/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import { GetUserInfo } from "@/actions/user";
import UserProvider from "@/components/providers/UserProvider";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import { GoogleAnalytics } from '@next/third-parties/google'

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  const { locale } = params
  const [session, messages] = await Promise.all([
    auth(),
    getMessages(),
  ])
  // The guest chatbot must not cause a profile request or token-based lookup.
  const getUserInfo = session ? await GetUserInfo() : undefined

  return (
    <html lang={locale}>
      <TranslationProvider locale={locale} messages={messages}>
        <body className="relative">
          <NextTopLoader showSpinner={false} />
          <SessionProvider session={session}>
            <UserProvider userInfo={getUserInfo?.data}>
              {children}
              <ChatbotWidget />
            </UserProvider>
          </SessionProvider>
        </body>
      </TranslationProvider>
      <GoogleAnalytics gaId="G-VQ6GVP37WF" />
    </html>
  );
}
