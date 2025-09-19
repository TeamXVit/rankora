import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      //console.log(profile);
      if (profile?.email?.endsWith("@vitapstudent.ac.in")) {
        return true;
      }
      return "/auth/error?error=Only VIT-AP student emails are allowed";
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub; // attach id
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      //console.log(token);
      //console.log(profile);
      return token;
    },
  },
};
