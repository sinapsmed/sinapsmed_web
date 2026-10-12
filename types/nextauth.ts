export interface CustomUser {
    userId: string
}

export interface CustomUserWithToken extends CustomUser {
    token: string
}