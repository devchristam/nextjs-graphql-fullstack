import { Role } from '@prisma/client';
import { Authorized, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Authorized([Role.MODERATOR, Role.ADMIN])
	@Field(() => ID)
	id!: string;

	@Field(() => String, { nullable: true })
	name!: string | null;

	@Field(() => String, { nullable: true })
	image!: string | null;
}
