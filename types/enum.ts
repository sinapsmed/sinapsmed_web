export enum ItemType {
    Analysis,
    Appointment
}

export enum FileType {
    Blog = 1,
    Banner,
    Specality,
    Category,
    Expert,
    Users,
    Appointmet,
}


export enum AppointmentType {
    MySelf = 1,
    Children = 2,
    Parent = 3,
    Other = 4
}

export enum AppointmentStatus {
    PaymentStart,
    Confirmed,
    Completed,
    Pending,
}

export enum NotificationType {
  All = 0,
  User = 1,
  Admin = 2,
  Expert = 3,
  Clinic = 4,
  Accountant = 5,
  Staff = 6,
}