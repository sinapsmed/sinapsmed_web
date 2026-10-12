import { GetCartItems } from "@/actions/cart";
import CheckoutSection from "@/containers/checkout/CheckoutSection";
import { couponKey } from "@/libs/keys";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.checkout')
    return {
        title: t('title'),
    }
}

export default async function CheckoutPage() {
    const couponCode = cookies().get(couponKey)?.value
    const getCartItems = await GetCartItems(cookies().get(couponKey)?.value)
    
    return (
        <main>
            {
                getCartItems.data && <CheckoutSection
                    data={getCartItems.data}
                    couponCode={(couponCode && getCartItems.statusCode === 202) ? couponCode : undefined}
                />
            }
        </main>
    )
}