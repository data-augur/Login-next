import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const authOptions = {
session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.username,
          password: credentials.password,
        };
        //Calling Nest API for login
        const resp = await fetch(backendURL + "/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        });
        
        const user = await resp.json();
        console.log(user);
        if (user.is_success) {
          console.log("User Authenticated");

          return user;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.data.auth.email;
        token.username = user.data.auth.userName;
        token.accessToken = user.data.auth.token;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.username = token.userName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);