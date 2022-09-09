import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
	@Field(() => String)
	@MaxLength(255)
	title!: string;

	@Field(() => String)
	content!: string;
}

@InputType()
export class UpdatePostInput {
	@Field(() => String, { nullable: true })
	@MaxLength(255)
	title?: string;

	@Field(() => String, { nullable: true })
	content?: string;
}
