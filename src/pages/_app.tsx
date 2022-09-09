import React, { ReactElement, ReactNode } from 'react';
import '@/frontend/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/frontend/apiClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					{getLayout(<Component {...pageProps} />)}
					<ReactQueryDevtools initialIsOpen={false} />
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
