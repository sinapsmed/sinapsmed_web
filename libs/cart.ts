import { CartItem, ClinicDetail, ConvertedCart } from "@/types/cart";
import { ItemType } from "@/types/enum";

export function getCartTotals(items: CartItem[]) {
    return items.reduce(
        (totals, item) => {
            totals.totalCount += item.count;
            totals.totalPrice += item.amount * item.count;
            totals.totalDiscounted += item.discounted * item.count;
            return totals;
        },
        { totalCount: 0, totalPrice: 0, totalDiscounted: 0 }
    );
}

export function convertCartItems(cartItems: CartItem[]): ConvertedCart {
    const analysesMap = new Map<string, {
        clinicDetail: ClinicDetail,
        items: {
            id: string
            title: string;
            count: number;
            amount: number;
            discounted: number;
        }[]
    }>();

    const appointments: ConvertedCart['appointments'] = [];

    for (const item of cartItems) {
        if (item.type === ItemType.Analysis && item.clinicDetail) {
            const key = item.clinicDetail.unicalKey;

            if (!analysesMap.has(key)) {
                analysesMap.set(key, {
                    clinicDetail: item.clinicDetail,
                    items: []
                });
            }

            analysesMap.get(key)!.items.push({
                id: item.id,
                title: item.title,
                count: item.count,
                amount: item.amount,
                discounted: item.discounted
            });

        } else if (item.type === ItemType.Appointment) {
            appointments.push({
                id: item.id,
                title: item.title,
                count: item.count,
                amount: item.amount,
                discounted: item.discounted
            });
        }
    }

    return {
        analyses: Array.from(analysesMap.values()),
        appointments
    };
}
