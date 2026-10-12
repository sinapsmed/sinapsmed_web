import { CustomUserWithToken } from "@/types/nextauth";
import { jwtDecode, JwtPayload } from "jwt-decode";



interface CustomJwtPayload extends JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string,
    "Full Name": string,
    "exp": number,
    "Image": string,
    "UnikalKey": string
}

export function decodeToken(token: string) {
    const data = jwtDecode<CustomJwtPayload>(token)
    
    return {
        userId: data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? '',
        token: token,
    } as CustomUserWithToken
}