import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const config = {
  providers: [GoogleProvider],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
