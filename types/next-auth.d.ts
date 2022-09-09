import { DefaultJWT } from 'next-auth/jwt';
import { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id?: string;
			role?: string;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		role?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id?: string;
		role?: string;
	}
}
