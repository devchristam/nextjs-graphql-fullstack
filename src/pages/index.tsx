import React, { ReactElement } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/frontend/apiClient';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';
import Dashboard from '@/frontend/components/layouts/Dashboard';
import { useSession } from 'next-auth/react';
import { BrowsePosts } from '@/frontend/components/BrowsePosts';

const Home: NextPageWithLayout = () => {
	const { data: session } = useSession();
	return (
		<div className="px-2">
			<h1 className="text-5xl font-extrabold leading-normal text-gray-800">
				Welcome {session?.user.name}
			</h1>
			<div className="mb-3">
				<Link href="/user-only">
					<a className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0">
						Visit User Only Page
					</a>
				</Link>
			</div>
			<div>
				<h2 className="text-3xl font-extrabold leading-normal text-gray-800">
					GraphQL API Example:
				</h2>
				<h3 className="text-xl text-gray-800">Browse all posts:</h3>
				<BrowsePosts />
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Dashboard>{page}</Dashboard>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session,
		},
	};
}

export default Home;
