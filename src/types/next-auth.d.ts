import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            email: string;
            name?: string;
        } & DefaultSession["user"];
        accessToken: string;
    }

    interface User extends DefaultUser {
        role: string;
        token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        role: string;
    }
}
