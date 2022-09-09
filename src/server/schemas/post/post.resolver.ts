import { Role } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Post } from './post.entity';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { PostService } from './post.service';

@Service()
@Resolver(Post)
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@Query(() => [Post])
	async browsePosts(): Promise<Post[]> {
		return this.postService.browsePosts();
	}

	@Query(() => Post)
	async readPost(@Arg('postId', () => String) postId: string): Promise<Post> {
		return this.postService.readPost(postId);
	}

	@Authorized([Role.MODERATOR, Role.ADMIN])
	@Mutation(() => Post)
	async editPost(
		@Arg('postId', () => String) postId: string,
		@Arg('UpdatePostInput', { validate: true }) updatePostObj: UpdatePostInput,
		@Ctx('token') token: JWT | null
	): Promise<Post> {
		return this.postService.editPost(postId, updatePostObj, token?.id ?? '');
	}

	@Authorized([Role.MODERATOR, Role.ADMIN])
	@Mutation(() => Post)
	async addPost(
		@Arg('CreatePostInput', { validate: true }) createPostObj: CreatePostInput,
		@Ctx('token') token: JWT | null
	): Promise<Post> {
		return this.postService.addPost(createPostObj, token?.id ?? '');
	}

	@Authorized([Role.MODERATOR, Role.ADMIN])
	@Mutation(() => Boolean)
	async deletePost(
		@Arg('postId', () => String) postId: string
	): Promise<boolean> {
		return this.postService.deletePost(postId);
	}
}
