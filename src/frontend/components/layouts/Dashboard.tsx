import Head from 'next/head';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import LoginButton from '../LoginButton';
export default function Dashboard({ children }: PropsWithChildren) {
	return (
		<>
			<Head>
				<title>NextJs GraphQL Template</title>
				<meta name="description" content="nextjs graphql template" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<nav className="border-gray-200 bg-white px-2 py-2.5 sm:px-4">
				<div className="container mx-auto flex flex-wrap items-center justify-between">
					<Link href="/">
						<a className="flex items-center">
							<span className="self-center whitespace-nowrap text-xl font-semibold">
								NextJS GraphQL Template
							</span>
						</a>
					</Link>
					<div className="flex md:order-2">
						<LoginButton />
					</div>
				</div>
			</nav>
			<div className="container mx-auto">{children}</div>
		</>
	);
}
