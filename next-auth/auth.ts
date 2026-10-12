import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { baseApi } from "@/libs/keys"
import { decodeToken } from "@/libs/token"

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: 'email' },
                password: { label: "password", type: "password" },
            },
            authorize: async ({ email, password }) => {                
                const response = await fetch(`${baseApi}/Auth/Login?email=${email}&password=${encodeURIComponent(password as string)}`,{
                    method: 'GET',
                    cache: 'no-store'
                })
                const result = await response.json()
                
                if (!result.success) throw Error(result.message)
                const user = decodeToken(result.data.jwt)
                return user
            },
        }),
    ],
})


