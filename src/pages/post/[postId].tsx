import React, { ReactElement } from 'react';
import Image from 'next/image';
import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { dehydrate } from '@tanstack/react-query';
import { gqlClient, gqlSdk, queryClient } from '@/frontend/apiClient';
import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import Dashboard from '@/frontend/components/layouts/Dashboard';
import { useReadPostQuery } from '@/generated/codegenReactQuery';

const Post: NextPageWithLayout<{ postId: string }> = ({ postId }) => {
	const { isError, data } = useReadPostQuery(gqlClient, { postId });

	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div className="px-2">
			<h1 className="text-5xl font-extrabold leading-normal text-gray-800">
				Read Post
			</h1>
			<div className="mb-3">
				<Link href="/">
					<a className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0">
						Back To Home Page
					</a>
				</Link>
			</div>
			<div>
				<div>
					<h1 className="mt-4 text-4xl font-semibold leading-tight text-gray-800 ">
						{data?.readPost.title}
					</h1>

					<div className="mt-6 flex items-center">
						<div className="flex shrink gap-2">
							{data?.readPost.createBy.image && (
								<span className="relative h-12 w-12">
									<Image
										src={data?.readPost.createBy.image}
										className="rounded-lg object-cover shadow-sm"
										width={48}
										height={48}
										layout="intrinsic"
										alt="user image"
									/>
								</span>
							)}
							<div>
								<div className="text-sm text-gray-900">
									{data?.readPost.createBy.name}
								</div>
								<div className="text-sm text-gray-500">
									{data?.readPost.createAt}
								</div>
							</div>
						</div>
					</div>
					<p className="mt-2">{data?.readPost.content}</p>
				</div>
			</div>
		</div>
	);
};

Post.getLayout = function getLayout(page: ReactElement) {
	return <Dashboard>{page}</Dashboard>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const postId = context.query.postId;
	if (Array.isArray(postId) || postId === undefined) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	// query in component will dehydrate when fetching
	// only work on query not require authorization
	try {
		await queryClient.fetchQuery(['ReadPost', { postId }], () =>
			gqlSdk.ReadPost({ postId })
		);
	} catch (error) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	);
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session,
			postId,
		},
	};
}

export default Post;
