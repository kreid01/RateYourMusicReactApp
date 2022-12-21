import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  cover: Scalars['String'];
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


export type QueryGetArtistByIdArgs = {
  id: Scalars['Int'];
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
  cover?: Maybe<Scalars['String']>;
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


export type GetAllReleasesQuery = { __typename?: 'Query', getAllReleases?: Array<{ __typename?: 'release', id?: number | null, genres?: Array<string | null> | null, artistId?: number | null, title?: string | null, rating?: number | null, recorded?: string | null, ratingCount?: number | null, cover?: string | null } | null> | null };

export type GetArtistNameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetArtistNameQuery = { __typename?: 'Query', getArtistById?: { __typename?: 'artist', name?: string | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'user', id?: number | null, username?: string | null } | null };

export type PostReleaseMutationVariables = Exact<{
  artistId: Scalars['Int'];
  type: Scalars['String'];
  title: Scalars['String'];
  recorded: Scalars['String'];
  language: Scalars['String'];
  genres: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  tracks: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
}>;


export type PostReleaseMutation = { __typename?: 'Mutation', postRelease?: { __typename?: 'release', id?: number | null } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "LoginResponse",
        "fields": [
          {
            "name": "accessToken",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "deleteArtist",
            "type": {
              "kind": "OBJECT",
              "name": "artist",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deleteRelease",
            "type": {
              "kind": "OBJECT",
              "name": "release",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deleteReview",
            "type": {
              "kind": "OBJECT",
              "name": "review",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deleteUser",
            "type": {
              "kind": "OBJECT",
              "name": "user",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "login",
            "type": {
              "kind": "OBJECT",
              "name": "LoginResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "postArtist",
            "type": {
              "kind": "OBJECT",
              "name": "artist",
              "ofType": null
            },
            "args": [
              {
                "name": "born",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "genres",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "relatedArtists",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "postRelease",
            "type": {
              "kind": "OBJECT",
              "name": "release",
              "ofType": null
            },
            "args": [
              {
                "name": "artistId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "cover",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "genres",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "language",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "recorded",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "tracks",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "postReview",
            "type": {
              "kind": "OBJECT",
              "name": "review",
              "ofType": null
            },
            "args": [
              {
                "name": "description",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "posterId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "rating",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "releaseId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "register",
            "type": {
              "kind": "OBJECT",
              "name": "user",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateArtist",
            "type": {
              "kind": "OBJECT",
              "name": "artist",
              "ofType": null
            },
            "args": [
              {
                "name": "genres",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "relatedArtists",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "updateRelease",
            "type": {
              "kind": "OBJECT",
              "name": "release",
              "ofType": null
            },
            "args": [
              {
                "name": "rating",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "ratingCount",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateReview",
            "type": {
              "kind": "OBJECT",
              "name": "review",
              "ofType": null
            },
            "args": [
              {
                "name": "description",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "rating",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "title",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "getAllArtists",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "artist",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "getAllReleases",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "release",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "getArtistById",
            "type": {
              "kind": "OBJECT",
              "name": "artist",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "getReleaseById",
            "type": {
              "kind": "OBJECT",
              "name": "release",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "getReviewById",
            "type": {
              "kind": "OBJECT",
              "name": "review",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "getReviews",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "review",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "getUser",
            "type": {
              "kind": "OBJECT",
              "name": "user",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "getUsers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "user",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "artist",
        "fields": [
          {
            "name": "born",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "genres",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "relatedArtists",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "release",
        "fields": [
          {
            "name": "artistId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "cover",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "genres",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "language",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "rating",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "ratingCount",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "recorded",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "tracks",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "review",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "postDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "posterId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "rating",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "releaseId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "title",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "user",
        "fields": [
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "password",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "tokenVersion",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const GetAllReleasesDocument = gql`
    query getAllReleases {
  getAllReleases {
    id
    genres
    artistId
    title
    rating
    recorded
    ratingCount
    cover
  }
}
    `;

export function useGetAllReleasesQuery(options?: Omit<Urql.UseQueryArgs<GetAllReleasesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllReleasesQuery, GetAllReleasesQueryVariables>({ query: GetAllReleasesDocument, ...options });
};
export const GetArtistNameDocument = gql`
    query getArtistName($id: Int!) {
  getArtistById(id: $id) {
    name
  }
}
    `;

export function useGetArtistNameQuery(options: Omit<Urql.UseQueryArgs<GetArtistNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetArtistNameQuery, GetArtistNameQueryVariables>({ query: GetArtistNameDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser {
  getUser {
    id
    username
  }
}
    `;

export function useGetUserQuery(options?: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const PostReleaseDocument = gql`
    mutation postRelease($artistId: Int!, $type: String!, $title: String!, $recorded: String!, $language: String!, $genres: [String]!, $tracks: [String]!, $cover: String!) {
  postRelease(
    artistId: $artistId
    type: $type
    title: $title
    recorded: $recorded
    language: $language
    genres: $genres
    tracks: $tracks
    cover: $cover
  ) {
    id
  }
}
    `;

export function usePostReleaseMutation() {
  return Urql.useMutation<PostReleaseMutation, PostReleaseMutationVariables>(PostReleaseDocument);
};