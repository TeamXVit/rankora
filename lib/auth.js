import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

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
      if (profile?.email?.endsWith("@vitapstudent.ac.in")) {
        try {
          await dbConnect();

          // check if user exists
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            await User.create({ email: profile.email });
            console.log("✅ New user saved:", profile.email);
          }
        } catch (err) {
          console.error("❌ Error saving user:", err);
          return false;
        }
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
    async jwt({ token }) {
      return token;
    },
  },
};
