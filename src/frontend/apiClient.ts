import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';
import { getSdk } from '@/generated/codegenGraphqlRequest';

export const gqlClient = new GraphQLClient(
	process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? ''
);

export const gqlSdk = getSdk(gqlClient);

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
