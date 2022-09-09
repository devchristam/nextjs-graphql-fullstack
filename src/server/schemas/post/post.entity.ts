import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';

@ObjectType()
export class Post {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	title!: string;

	@Field(() => String)
	content!: string;

	@Field(() => Date)
	createAt!: Date;

	@Field(() => Date)
	updateAt!: Date;

	@Field(() => User)
	createBy!: User;

	@Field(() => User)
	updateBy!: User;
}
