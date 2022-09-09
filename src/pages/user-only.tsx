import { dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { queryClient } from '@/frontend/apiClient';
import Dashboard from '@/frontend/components/layouts/Dashboard';
import { authOptions } from './api/auth/[...nextauth]';

export default function ServerFetch() {
	return (
		<div className="px-2">
			<h1 className="text-5xl font-extrabold leading-normal text-gray-800">
				User Only Page
			</h1>
			<div className="mb-3">
				<Link href="/">
					<a className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0">
						Back To Home Page
					</a>
				</Link>
			</div>
		</div>
	);
}

ServerFetch.getLayout = function getLayout(page: ReactElement) {
	return <Dashboard>{page}</Dashboard>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	if (!session) {
		return {
			redirect: {
				destination: '/not-allow',
				permanent: false,
			},
		};
	}
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session,
		},
	};
}
