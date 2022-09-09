export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreatePostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost: Post;
  deletePost: Scalars['Boolean'];
  editPost: Post;
};


export type MutationAddPostArgs = {
  CreatePostInput: CreatePostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationEditPostArgs = {
  UpdatePostInput: UpdatePostInput;
  postId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  createAt: Scalars['DateTime'];
  createBy: User;
  id: Scalars['ID'];
  title: Scalars['String'];
  updateAt: Scalars['DateTime'];
  updateBy: User;
};

export type Query = {
  __typename?: 'Query';
  browsePosts: Array<Post>;
  readPost: Post;
};


export type QueryReadPostArgs = {
  postId: Scalars['String'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AddPostMutationVariables = Exact<{
  CreatePostInput: CreatePostInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', id: string, title: string, content: string, createAt: any, createBy: { __typename?: 'User', id: string, name?: string | null } } };

export type BrowsePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrowsePostsQuery = { __typename?: 'Query', browsePosts: Array<{ __typename?: 'Post', id: string, title: string, createAt: any, createBy: { __typename?: 'User', name?: string | null, image?: string | null } }> };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditPostMutationVariables = Exact<{
  UpdatePostInput: UpdatePostInput;
  postId: Scalars['String'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'Post', id: string, content: string, title: string, createAt: any, updateAt: any, createBy: { __typename?: 'User', name?: string | null }, updateBy: { __typename?: 'User', name?: string | null } } };

export type ReadPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ReadPostQuery = { __typename?: 'Query', readPost: { __typename?: 'Post', id: string, title: string, content: string, createAt: any, createBy: { __typename?: 'User', name?: string | null, image?: string | null } } };
