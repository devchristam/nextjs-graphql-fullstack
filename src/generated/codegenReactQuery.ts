import * as Types from './codegenPreset';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}

export const AddPostDocument = `
    mutation AddPost($CreatePostInput: CreatePostInput!) {
  addPost(CreatePostInput: $CreatePostInput) {
    id
    title
    content
    createAt
    createBy {
      id
      name
    }
  }
}
    `;
export const useAddPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<Types.AddPostMutation, TError, Types.AddPostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<Types.AddPostMutation, TError, Types.AddPostMutationVariables, TContext>(
      ['AddPost'],
      (variables?: Types.AddPostMutationVariables) => fetcher<Types.AddPostMutation, Types.AddPostMutationVariables>(client, AddPostDocument, variables, headers)(),
      options
    );
export const BrowsePostsDocument = `
    query BrowsePosts {
  browsePosts {
    id
    title
    createAt
    createBy {
      name
      image
    }
  }
}
    `;
export const useBrowsePostsQuery = <
      TData = Types.BrowsePostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: Types.BrowsePostsQueryVariables,
      options?: UseQueryOptions<Types.BrowsePostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Types.BrowsePostsQuery, TError, TData>(
      variables === undefined ? ['BrowsePosts'] : ['BrowsePosts', variables],
      fetcher<Types.BrowsePostsQuery, Types.BrowsePostsQueryVariables>(client, BrowsePostsDocument, variables, headers),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<Types.DeletePostMutation, TError, Types.DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<Types.DeletePostMutation, TError, Types.DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      (variables?: Types.DeletePostMutationVariables) => fetcher<Types.DeletePostMutation, Types.DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const EditPostDocument = `
    mutation EditPost($UpdatePostInput: UpdatePostInput!, $postId: String!) {
  editPost(postId: $postId, UpdatePostInput: $UpdatePostInput) {
    id
    content
    title
    createAt
    updateAt
    createBy {
      name
    }
    updateBy {
      name
    }
  }
}
    `;
export const useEditPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<Types.EditPostMutation, TError, Types.EditPostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<Types.EditPostMutation, TError, Types.EditPostMutationVariables, TContext>(
      ['EditPost'],
      (variables?: Types.EditPostMutationVariables) => fetcher<Types.EditPostMutation, Types.EditPostMutationVariables>(client, EditPostDocument, variables, headers)(),
      options
    );
export const ReadPostDocument = `
    query ReadPost($postId: String!) {
  readPost(postId: $postId) {
    id
    title
    content
    createAt
    createBy {
      name
      image
    }
  }
}
    `;
export const useReadPostQuery = <
      TData = Types.ReadPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: Types.ReadPostQueryVariables,
      options?: UseQueryOptions<Types.ReadPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Types.ReadPostQuery, TError, TData>(
      ['ReadPost', variables],
      fetcher<Types.ReadPostQuery, Types.ReadPostQueryVariables>(client, ReadPostDocument, variables, headers),
      options
    );