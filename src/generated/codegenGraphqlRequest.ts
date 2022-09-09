import * as Types from './codegenPreset';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';

export const AddPostDocument = gql`
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
export const BrowsePostsDocument = gql`
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
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;
export const EditPostDocument = gql`
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
export const ReadPostDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddPost(variables: Types.AddPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.AddPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.AddPostMutation>(AddPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddPost', 'mutation');
    },
    BrowsePosts(variables?: Types.BrowsePostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.BrowsePostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.BrowsePostsQuery>(BrowsePostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BrowsePosts', 'query');
    },
    DeletePost(variables: Types.DeletePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePost', 'mutation');
    },
    EditPost(variables: Types.EditPostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.EditPostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.EditPostMutation>(EditPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EditPost', 'mutation');
    },
    ReadPost(variables: Types.ReadPostQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Types.ReadPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.ReadPostQuery>(ReadPostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ReadPost', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;