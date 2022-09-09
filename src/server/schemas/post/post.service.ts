import { prismaClient } from '@/server/prismaClient';
import { Service } from 'typedi';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { Post } from './post.entity';

@Service()
export class PostService {
	private prismaPostSelect = {
		id: true,
		title: true,
		content: true,
		createAt: true,
		updateAt: true,
		createBy: {
			select: {
				id: true,
				name: true,
				image: true,
			},
		},
		updateBy: {
			select: {
				id: true,
				name: true,
				image: true,
			},
		},
	};

	async browsePosts(): Promise<Post[]> {
		const posts = await prismaClient.post.findMany({
			select: this.prismaPostSelect,
		});
		return posts;
	}

	async readPost(postId: string): Promise<Post> {
		const post = await prismaClient.post.findUniqueOrThrow({
			where: {
				id: postId,
			},
			select: this.prismaPostSelect,
		});
		return post;
	}

	async editPost(
		postId: string,
		UpdatePostObj: UpdatePostInput,
		userId: string
	): Promise<Post> {
		if (userId === '') {
			throw new Error('user not found');
		}
		const editPost = await prismaClient.post.update({
			where: {
				id: postId,
			},
			data: {
				title: UpdatePostObj.title,
				content: UpdatePostObj.content,
				updateAt: new Date(),
				updateBy: {
					connect: {
						id: userId,
					},
				},
			},
			select: this.prismaPostSelect,
		});
		return editPost;
	}

	async addPost(createPostObj: CreatePostInput, userId: string): Promise<Post> {
		if (userId === '') {
			throw new Error('user not found');
		}
		const newPost = await prismaClient.post.create({
			data: {
				title: createPostObj.title,
				content: createPostObj.content,
				createBy: {
					connect: {
						id: userId,
					},
				},
				updateBy: {
					connect: {
						id: userId,
					},
				},
			},
			select: this.prismaPostSelect,
		});
		return newPost;
	}

	async deletePost(postId: string): Promise<boolean> {
		try {
			await prismaClient.post.delete({
				where: {
					id: postId,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}
