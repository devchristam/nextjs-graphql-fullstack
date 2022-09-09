import 'reflect-metadata';
import { createServer } from '@graphql-yoga/node';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { getToken, JWT } from 'next-auth/jwt';
import { customAuthChecker } from '@/server/authChecker/customAuthChecker';
import { PostResolver } from '@/server/schemas/post/post.resolver';

export const config = {
	api: {
		bodyParser: false,
	},
};

const schema = await buildSchema({
	resolvers: [PostResolver],
	container: Container,
	authChecker: customAuthChecker,
	emitSchemaFile:
		process.env.NODE_ENV === 'production'
			? false
			: {
					path: './src/generated/schema.gql',
					commentDescriptions: true,
					sortedSchema: false,
			  },
});

export interface ContextType {
	token: JWT | null;
}

export default createServer<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	graphiql: process.env.NODE_ENV === 'production' ? false : true,
	schema,
	context: async ({ req }): Promise<ContextType> => {
		return {
			token: await getToken({ req }),
		};
	},
});
