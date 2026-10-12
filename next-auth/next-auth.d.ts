import { CustomUser, CustomUserWithToken } from '@/types/nextauth';
import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';


declare module 'next-auth' {
  interface User extends CustomUserWithToken {
    
  }

  interface Session {
    user: CustomUser;
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends CustomUserWithToken {
  }
}
