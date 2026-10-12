import { ClinicDetail } from "./cart";
import { AppointmentStatus, AppointmentType } from "./enum";

export interface UserAppointment {
    id: string;
    unikalKey: string;
    dates: string[];
    price: number;
    expertName: string;
    expertImageUrl: string;
    sessions: Session[]
}
export interface Session {
    id: string;
    date: string;
    meetLink: string;
}
export interface UserAppointmentDetail extends UserAppointment {
    userNote?: string;
    serviceName: string;
    serviceId: string;
    userWhatsApp: string;
    appointmentType: AppointmentType;
    status: AppointmentStatus;
    dates: string[];
    additionalUser?: AdditionalUser;
    attachments: Attachment[];
    duration: number;
}

export interface Attachment {
    attachment: string;
    title: string;
}

export interface AdditionalUser {
    fullName: string;
    dateOfBrith: string;
    gender: boolean;
}

export interface UserAnalysis {
  id: string;
  name: string;
  price: number;
  code: string;
  date: string;
  unikalKey: string;
  count: number;
  isVerificated: boolean;
  clinic: ClinicDetail
  userName: string
}