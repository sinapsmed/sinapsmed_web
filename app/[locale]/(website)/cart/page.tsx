import { GetCartItems } from "@/actions/cart";
import Banner from "@/components/commons/Banner";
import CartSection from "@/containers/cart/CartSection";
import { couponKey } from "@/libs/keys";
import { Path } from "@/types/header";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('metadata.cart')
    return {
        title: t('title'),
    }
}


export default async function CartPage() {
    const couponCode = cookies().get(couponKey)?.value
    const [
        getCartItems,
        t
    ] = await Promise.all([
        GetCartItems(couponCode),
        getTranslations('common.navbar'),
    ])
    const routeName = t.raw('routes')[6]
    const paths: Path[] = [
        {
            title: routeName,
        }
    ]

    return (
        <main>
            <Banner paths={paths} />
            {
                getCartItems.data &&
                <CartSection
                    message={couponCode?getCartItems.message:undefined}
                    success={getCartItems.statusCode === 202}
                    couponCode={couponCode}
                    data={getCartItems.data}
                />
            }
        </main>
    )
}