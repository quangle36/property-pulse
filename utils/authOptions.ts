import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { AuthOptions } from 'next-auth';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		// Invoked on successful signin
		async signIn({ profile }) {
			//1. Connect to database
			await connectDB();
			//2. Check if user exists
			const user = await User.findOne({ email: profile?.email });
			//3. If not, then add user to database
			if (!user) {
				const username = profile?.name?.slice(0, 20);
				await User.create({
					username,
					email: profile?.email,
					image: profile?.image,
				});
			}
			//4. Return true to allow sign in
			return true;
		},
		//Modifies the session object
		async session({ session }: any) {
			//1. Get user from database
			const user = await User.findOne({ email: session.user.email });
			//2. Assign the user id to the session
			session.user.id = user._id;
			//3. Return the session
			return session;
		},
	},
};
