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
  refreshToken?: Maybe<Scalars['String']>;
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
  released: Scalars['String'];
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
  cover: Scalars['String'];
  genres: Array<InputMaybe<Scalars['String']>>;
  id: Scalars['Int'];
  language: Scalars['String'];
  rating: Scalars['Float'];
  ratingCount: Scalars['Int'];
  released: Scalars['String'];
  title: Scalars['String'];
  tracks: Array<InputMaybe<Scalars['String']>>;
  type: Scalars['String'];
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
  getReleaseReviews?: Maybe<Array<Maybe<Review>>>;
  getReviewById?: Maybe<Review>;
  getReviews?: Maybe<Array<Maybe<Review>>>;
  getUser?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  searchArtists?: Maybe<Array<Maybe<Artist>>>;
  searchReleases?: Maybe<Array<Maybe<Release>>>;
};


export type QueryGetArtistByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetReleaseByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetReleaseReviewsArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySearchArtistsArgs = {
  search: Scalars['String'];
};


export type QuerySearchReleasesArgs = {
  search: Scalars['String'];
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
  rating?: Maybe<Scalars['Float']>;
  ratingCount?: Maybe<Scalars['Int']>;
  released?: Maybe<Scalars['String']>;
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
  username?: Maybe<Scalars['String']>;
};

export type GetArtistNameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetArtistNameQuery = { __typename?: 'Query', getArtistById?: { __typename?: 'artist', name?: string | null } | null };

export type SearchArtistsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchArtistsQuery = { __typename?: 'Query', searchArtists?: Array<{ __typename?: 'artist', id?: number | null, name?: string | null, genres?: Array<string | null> | null } | null> | null };

export type GetAllReleasesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReleasesQuery = { __typename?: 'Query', getAllReleases?: Array<{ __typename?: 'release', id?: number | null, genres?: Array<string | null> | null, artistId?: number | null, title?: string | null, rating?: number | null, released?: string | null, ratingCount?: number | null, cover?: string | null } | null> | null };

export type GetReleaseByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetReleaseByIdQuery = { __typename?: 'Query', getReleaseById?: { __typename?: 'release', artistId?: number | null, cover?: string | null, genres?: Array<string | null> | null, language?: string | null, id?: number | null, rating?: number | null, ratingCount?: number | null, title?: string | null, released?: string | null, tracks?: Array<string | null> | null, type?: string | null } | null };

export type GetReleaseReviewsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetReleaseReviewsQuery = { __typename?: 'Query', getReleaseReviews?: Array<{ __typename?: 'review', id?: number | null, description?: string | null, title?: string | null, posterId?: number | null, postDate?: string | null, rating?: number | null } | null> | null };

export type PostReleaseMutationVariables = Exact<{
  artistId: Scalars['Int'];
  type: Scalars['String'];
  title: Scalars['String'];
  released: Scalars['String'];
  language: Scalars['String'];
  genres: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  tracks: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
}>;


export type PostReleaseMutation = { __typename?: 'Mutation', postRelease?: { __typename?: 'release', id?: number | null } | null };

export type SearchReleasesQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchReleasesQuery = { __typename?: 'Query', searchReleases?: Array<{ __typename?: 'release', id?: number | null, title?: string | null, cover?: string | null, genres?: Array<string | null> | null, released?: string | null } | null> | null };

export type UpdateReleaseMutationVariables = Exact<{
  id: Scalars['Int'];
  ratingCount: Scalars['Int'];
  rating: Scalars['Float'];
  type: Scalars['String'];
  title: Scalars['String'];
  released: Scalars['String'];
  language: Scalars['String'];
  genres: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  tracks: Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>;
  cover: Scalars['String'];
}>;


export type UpdateReleaseMutation = { __typename?: 'Mutation', updateRelease?: { __typename?: 'release', tracks?: Array<string | null> | null } | null };

export type PostReviewMutationVariables = Exact<{
  posterId: Scalars['Int'];
  releaseId: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  rating: Scalars['Int'];
}>;


export type PostReviewMutation = { __typename?: 'Mutation', postReview?: { __typename?: 'review', posterId?: number | null, description?: string | null, releaseId?: number | null, rating?: number | null, title?: string | null } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'user', id?: number | null, username?: string | null } | null };

export type GetUsernameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUsernameQuery = { __typename?: 'Query', getUserById?: { __typename?: 'user', username?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResponse', accessToken?: string | null, refreshToken?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'user', id?: number | null } | null };

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
          },
          {
            "name": "refreshToken",
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
                "name": "released",
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
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
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
              },
              {
                "name": "released",
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
            "name": "getReleaseReviews",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "review",
                "ofType": null
              }
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
            "name": "getUserById",
            "type": {
              "kind": "OBJECT",
              "name": "user",
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
          },
          {
            "name": "searchArtists",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "artist",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "search",
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
            "name": "searchReleases",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "release",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "search",
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
            "name": "released",
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
export const SearchArtistsDocument = gql`
    query searchArtists($search: String!) {
  searchArtists(search: $search) {
    id
    name
    genres
  }
}
    `;

export function useSearchArtistsQuery(options: Omit<Urql.UseQueryArgs<SearchArtistsQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchArtistsQuery, SearchArtistsQueryVariables>({ query: SearchArtistsDocument, ...options });
};
export const GetAllReleasesDocument = gql`
    query getAllReleases {
  getAllReleases {
    id
    genres
    artistId
    title
    rating
    released
    ratingCount
    cover
  }
}
    `;

export function useGetAllReleasesQuery(options?: Omit<Urql.UseQueryArgs<GetAllReleasesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllReleasesQuery, GetAllReleasesQueryVariables>({ query: GetAllReleasesDocument, ...options });
};
export const GetReleaseByIdDocument = gql`
    query getReleaseById($id: Int!) {
  getReleaseById(id: $id) {
    artistId
    cover
    genres
    language
    language
    id
    rating
    ratingCount
    title
    released
    tracks
    type
  }
}
    `;

export function useGetReleaseByIdQuery(options: Omit<Urql.UseQueryArgs<GetReleaseByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReleaseByIdQuery, GetReleaseByIdQueryVariables>({ query: GetReleaseByIdDocument, ...options });
};
export const GetReleaseReviewsDocument = gql`
    query getReleaseReviews($id: Int!) {
  getReleaseReviews(id: $id) {
    id
    description
    title
    posterId
    postDate
    title
    rating
  }
}
    `;

export function useGetReleaseReviewsQuery(options: Omit<Urql.UseQueryArgs<GetReleaseReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReleaseReviewsQuery, GetReleaseReviewsQueryVariables>({ query: GetReleaseReviewsDocument, ...options });
};
export const PostReleaseDocument = gql`
    mutation postRelease($artistId: Int!, $type: String!, $title: String!, $released: String!, $language: String!, $genres: [String]!, $tracks: [String]!, $cover: String!) {
  postRelease(
    artistId: $artistId
    type: $type
    title: $title
    released: $released
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
export const SearchReleasesDocument = gql`
    query searchReleases($search: String!) {
  searchReleases(search: $search) {
    id
    title
    cover
    genres
    released
  }
}
    `;

export function useSearchReleasesQuery(options: Omit<Urql.UseQueryArgs<SearchReleasesQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchReleasesQuery, SearchReleasesQueryVariables>({ query: SearchReleasesDocument, ...options });
};
export const UpdateReleaseDocument = gql`
    mutation updateRelease($id: Int!, $ratingCount: Int!, $rating: Float!, $type: String!, $title: String!, $released: String!, $language: String!, $genres: [String]!, $tracks: [String]!, $cover: String!) {
  updateRelease(
    id: $id
    ratingCount: $ratingCount
    rating: $rating
    type: $type
    title: $title
    released: $released
    language: $language
    genres: $genres
    tracks: $tracks
    cover: $cover
  ) {
    tracks
  }
}
    `;

export function useUpdateReleaseMutation() {
  return Urql.useMutation<UpdateReleaseMutation, UpdateReleaseMutationVariables>(UpdateReleaseDocument);
};
export const PostReviewDocument = gql`
    mutation postReview($posterId: Int!, $releaseId: Int!, $title: String!, $description: String!, $rating: Int!) {
  postReview(
    posterId: $posterId
    releaseId: $releaseId
    title: $title
    description: $description
    rating: $rating
  ) {
    posterId
    description
    releaseId
    rating
    title
  }
}
    `;

export function usePostReviewMutation() {
  return Urql.useMutation<PostReviewMutation, PostReviewMutationVariables>(PostReviewDocument);
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
export const GetUsernameDocument = gql`
    query getUsername($id: Int!) {
  getUserById(id: $id) {
    username
  }
}
    `;

export function useGetUsernameQuery(options: Omit<Urql.UseQueryArgs<GetUsernameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsernameQuery, GetUsernameQueryVariables>({ query: GetUsernameDocument, ...options });
};
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};