import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteArtist?: Maybe<Artist>;
  deleteRelease?: Maybe<Release>;
  deleteReview?: Maybe<Review>;
  deleteUser?: Maybe<User>;
  login?: Maybe<LoginResponse>;
  postArtist?: Maybe<Artist>;
  postRelease?: Maybe<Release>;
  postReview?: Maybe<Review>;
  register?: Maybe<User>;
  updateArtist?: Maybe<Artist>;
  updateRelease?: Maybe<Release>;
  updateReview?: Maybe<Review>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPostArtistArgs = {
  born: Scalars['String'];
  genres: Array<InputMaybe<Scalars['String']>>;
  name: Scalars['String'];
  relatedArtists: Array<InputMaybe<Scalars['String']>>;
  type: Scalars['String'];
};


export type MutationPostReleaseArgs = {
  artistId: Scalars['Int'];
  genres: Array<InputMaybe<Scalars['String']>>;
  language: Scalars['String'];
  recorded: Scalars['String'];
  title: Scalars['String'];
  tracks: Array<InputMaybe<Scalars['String']>>;
  type: Scalars['String'];
};


export type MutationPostReviewArgs = {
  description: Scalars['String'];
  posterId: Scalars['Int'];
  rating: Scalars['Int'];
  releaseId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateArtistArgs = {
  genres: Array<InputMaybe<Scalars['String']>>;
  name: Scalars['String'];
  relatedArtists: Array<InputMaybe<Scalars['String']>>;
};


export type MutationUpdateReleaseArgs = {
  rating: Scalars['Int'];
  ratingCount: Scalars['Int'];
};


export type MutationUpdateReviewArgs = {
  description: Scalars['String'];
  rating: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllArtists?: Maybe<Array<Maybe<Artist>>>;
  getAllReleases?: Maybe<Array<Maybe<Release>>>;
  getArtistById?: Maybe<Artist>;
  getReleaseById?: Maybe<Release>;
  getReviewById?: Maybe<Review>;
  getReviews?: Maybe<Array<Maybe<Review>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type Artist = {
  __typename?: 'artist';
  born?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  relatedArtists?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type Release = {
  __typename?: 'release';
  artistId?: Maybe<Scalars['Int']>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Int']>;
  ratingCount?: Maybe<Scalars['Int']>;
  recorded?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  tracks?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'review';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  postDate?: Maybe<Scalars['String']>;
  posterId?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  releaseId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'user';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  tokenVersion?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type GetAllReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReleasesQuery = { __typename?: 'Query', getAllReleases?: Array<{ __typename?: 'release', genres?: Array<string | null> | null, artistId?: number | null, title?: string | null, rating?: number | null, ratingCount?: number | null } | null> | null };


export const GetAllReleasesDocument = `
    query getAllReleases {
  getAllReleases {
    genres
    artistId
    title
    rating
    ratingCount
  }
}
    `;
export const useGetAllReleasesQuery = <
      TData = GetAllReleasesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllReleasesQueryVariables,
      options?: UseQueryOptions<GetAllReleasesQuery, TError, TData>
    ) =>
    useQuery<GetAllReleasesQuery, TError, TData>(
      variables === undefined ? ['getAllReleases'] : ['getAllReleases', variables],
      fetcher<GetAllReleasesQuery, GetAllReleasesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllReleasesDocument, variables),
      options
    );