import { AuthChecker } from 'type-graphql';
import { ContextType } from '@/pages/api/graphql';

export const customAuthChecker: AuthChecker<ContextType> = (
	{ context },
	roles: string[]
) => {
	if (context.token === null) {
		return false;
	}
	if (
		roles.length > 0 &&
		(context.token.role === undefined || !roles.includes(context.token.role))
	) {
		return false;
	}
	return true;
};
