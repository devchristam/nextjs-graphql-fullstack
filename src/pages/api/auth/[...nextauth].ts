import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { prismaClient } from '@/server/prismaClient';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	adapter: PrismaAdapter(prismaClient),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user?.id;
				token.role = user?.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token?.id;
				session.user.role = token?.role;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
