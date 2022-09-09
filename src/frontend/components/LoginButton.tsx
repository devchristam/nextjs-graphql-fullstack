import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function LoginButton(): JSX.Element {
	const { data: session } = useSession();
	if (session) {
		return (
			<button
				type="button"
				className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
				onClick={() => signOut()}
			>
				Sign out
			</button>
		);
	}
	return (
		<button
			type="button"
			className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0"
			onClick={() => signIn()}
		>
			Sign in
		</button>
	);
}
