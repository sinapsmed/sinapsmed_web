import { ItemType } from "./enum";

export interface ClinicDetail {
    id: string,
    name: string,
    unicalKey: string,
    mapLink: string
}

export interface CartItem {
    id: string;
    type: ItemType;
    title: string;
    count: number;
    amount: number;
    discounted: number;
    serviceId: string;
    clinicDetail?: ClinicDetail
    userName: string
}

export interface ConvertedCart {
    analyses: {
        clinicDetail: ClinicDetail,
        items: {
            id: string;
            title: string;
            count: number;
            amount: number;
            discounted: number;
        }[]
    }[]
    appointments: {
        id: string;
        title: string;
        count: number;
        amount: number;
        discounted: number;
    }[]
}

export interface NewCartItem {
    userId: string,
    type: ItemType,
    analysisId?: string,
    appointmentId?: string,
    count: number,
    userName: string
}

export interface UpdatedItem {
    itemId: string,
    newCount: number
}