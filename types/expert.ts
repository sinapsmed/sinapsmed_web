import { AppointmentType } from "./enum";

export interface BoostedExpert {
    fullName: string;
    photoUrl: string;
    seoUrl: string;
    id: string;
    specialties: string[];
}

export interface Expert {
    id: string;
    services: string;
    specality: string;
    resume: string;
    photoUrl: string;
    fullName: string;
    seo: string;
    biography?: string;
}

export interface SubService {
    id: string;
    logoUrl: string;
    title: string;
    price: number;
    duration: number;
    sessionCount: number;
}

export interface ExpertService {
    serviceId: string;
    serviceName: string;
    subServices: SubService[];
}

export interface ExpertServiceList {
    expert?: string,
    expertServices?: ExpertService[]
}

export interface PatientInfo {
    fullName: string,
    gender?: boolean,
    birthDate?: string,
    email: string,
    phoneNumber: string
}

export interface NewAppointment {
    servicePeriodId: string;
    userId?: string;
    expertId: string;
    userNote?: string;
    userWhatsApp: string;
    dates: string[];
    additionalUser?: {
        fullName: string;
        dateOfBrith: string;
        gender: boolean;
    };
    appointmentType: AppointmentType;
}



export interface DetailsExpert {
  id: string
  fullName: string
  specality: string
  biography?: string | null
  locationCity?: string | null
  photoUrl: string
  phoneNumber?: string | null
  email?: string
  educations?: Education[]
  achievements?: Achievements[]
  socialMedias?: SocialMedia[]
  galleries?: GalleryItem[]
  workLanguage?: string
}
export interface GalleryItem {
  type: number; 
  url: string;
}
export interface Education {
  university: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}
export interface SocialMedia {
  key: string
  value: string
}
export interface Achievements {
  title: string
  imageUrl: string
  achievementType: number
}


