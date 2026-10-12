import { authKey } from '@/libs/keys';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    session: {
            strategy: 'jwt',
            maxAge: 259200 
    },
    secret: authKey,
    trustHost: true,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.userId
                token.token = user.token
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.userId = token.userId
                session.token = token.token
            }
            return session
        }
    },
    providers: [],
} satisfies NextAuthConfig;