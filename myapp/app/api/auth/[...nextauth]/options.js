import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/User';
import bcrypt from "bcrypt";
import db from '@/lib/db';


export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
              console.log("Profile Google: ", profile);
      
              let userRole = "Google User";
              
              if (profile?.email == "thejayadad@gmail.com") {
                userRole = "admin";
              }
              return {
                ...profile,
                id: profile.sub,
                role: userRole,
                name: profile.name.replace(" ", "").toLowerCase(),
                avatar: profile.picture,
                public_id: "",
                followers: [],
                following: [],
                total_followers: 0,
                total_following: 0
              };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
          const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();
    
          return session;
        },
        async signIn({ account, profile, user, credentials }) {
          try {
            await db.connect();
    
            const userExists = await User.findOne({ email: profile.email });
    
            if (!userExists) {
              await User.create({
                email: profile.email,
                name: profile.name.replace(" ", "").toLowerCase(),
                avatar: profile.picture,
                public_id: "",
                followers: [],
                following: [],
                total_followers: 0,
                total_following: 0
              });
            }
    
            return true
          } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return false
          }
        },
      }
}
