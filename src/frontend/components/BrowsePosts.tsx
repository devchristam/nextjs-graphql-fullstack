import Link from 'next/link';
import React from 'react';
import { useBrowsePostsQuery } from '@/generated/codegenReactQuery';
import { gqlClient } from '../apiClient';
import Image from 'next/image';
export function BrowsePosts(): JSX.Element {
	const { data, isError, isLoading } = useBrowsePostsQuery(gqlClient);
	if (isError) {
		return <div>Error</div>;
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			{data.browsePosts.map((post) => {
				return (
					<div key={post.id}>
						<Link href={`/post/${post.id}`}>
							<a className="relative block overflow-hidden rounded-lg border border-gray-100 p-8">
								<div className="justify-between sm:flex">
									<div>
										<h5 className="text-xl font-bold text-gray-900">
											{post.title}
										</h5>
										<p className="mt-1 text-xs font-medium text-gray-600">
											By {post.createBy.name}
										</p>
									</div>

									{post.createBy.image && (
										<div className="ml-3 hidden shrink-0 sm:block">
											<div className="relative h-16 w-16">
												<Image
													src={post.createBy.image}
													className="rounded-lg object-cover shadow-sm"
													width={64}
													height={64}
													layout="intrinsic"
													alt="user image"
												/>
											</div>
										</div>
									)}
								</div>

								<dl className="mt-6 flex">
									<div className="flex flex-col-reverse">
										<dd className="text-xs text-gray-500">
											{new Date(post.createAt).toLocaleString('en-US')}
										</dd>
									</div>
								</dl>
							</a>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
