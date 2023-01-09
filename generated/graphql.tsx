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
  deleteChannel?: Maybe<Channel>;
  deleteMessage?: Maybe<Message>;
  deletePlaylist?: Maybe<Playlist>;
  deleteRelease?: Maybe<Release>;
  deleteReview?: Maybe<Review>;
  deleteUser?: Maybe<User>;
  login?: Maybe<LoginResponse>;
  postArtist?: Maybe<Artist>;
  postChannel?: Maybe<Channel>;
  postMessage?: Maybe<Message>;
  postPlaylist?: Maybe<Playlist>;
  postRelease?: Maybe<Release>;
  postReview?: Maybe<Review>;
  register?: Maybe<User>;
  updateArtist?: Maybe<Artist>;
  updateChannel?: Maybe<Channel>;
  updatePlaylist?: Maybe<Playlist>;
  updateRelease?: Maybe<Release>;
  updateReview?: Maybe<Review>;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['Int'];
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


export type MutationPostChannelArgs = {
  releaseId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationPostMessageArgs = {
  channelId: Scalars['Int'];
  content: Scalars['String'];
  posterId: Scalars['Int'];
};


export type MutationPostPlaylistArgs = {
  contentIds?: InputMaybe<Array<Scalars['Int']>>;
  posterId: Scalars['Int'];
  title: Scalars['String'];
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


export type MutationUpdateChannelArgs = {
  open: Array<InputMaybe<Scalars['Boolean']>>;
};


export type MutationUpdatePlaylistArgs = {
  contentIds?: InputMaybe<Array<Scalars['Int']>>;
  id: Scalars['Int'];
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
  getAllChannels?: Maybe<Array<Maybe<Channel>>>;
  getAllReleases?: Maybe<Array<Maybe<Release>>>;
  getArtistById?: Maybe<Artist>;
  getChannelById?: Maybe<Channel>;
  getChatMessages?: Maybe<Array<Maybe<Message>>>;
  getMessageById?: Maybe<Message>;
  getPlaylistById?: Maybe<Playlist>;
  getReleaseById?: Maybe<Release>;
  getReleaseReviews?: Maybe<Array<Maybe<Review>>>;
  getReviewById?: Maybe<Review>;
  getReviews?: Maybe<Array<Maybe<Review>>>;
  getUser?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUserPlaylists?: Maybe<Array<Maybe<Playlist>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  searchArtists?: Maybe<Array<Maybe<Artist>>>;
  searchReleases?: Maybe<Array<Maybe<Release>>>;
};


export type QueryGetAllReleasesArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryGetArtistByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetChannelByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetChatMessagesArgs = {
  id: Scalars['Int'];
};


export type QueryGetMessageByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetPlaylistByIdArgs = {
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


export type QueryGetUserPlaylistsArgs = {
  id: Scalars['Int'];
};


export type QuerySearchArtistsArgs = {
  search: Scalars['String'];
};


export type QuerySearchReleasesArgs = {
  search: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSubscription?: Maybe<Message>;
};


export type SubscriptionMessageSubscriptionArgs = {
  channelId: Scalars['Int'];
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

export type Channel = {
  __typename?: 'channel';
  id?: Maybe<Scalars['Int']>;
  releaseId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'message';
  channelId?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  postDate?: Maybe<Scalars['String']>;
  posterId?: Maybe<Scalars['Int']>;
};

export type Playlist = {
  __typename?: 'playlist';
  contentIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
  id?: Maybe<Scalars['Int']>;
  posterId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
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

export type GetChannelNameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetChannelNameQuery = { __typename?: 'Query', getChannelById?: { __typename?: 'channel', title?: string | null } | null };

export type GetAllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllChannelsQuery = { __typename?: 'Query', getAllChannels?: Array<{ __typename?: 'channel', id?: number | null, title?: string | null, releaseId?: number | null } | null> | null };

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage?: { __typename?: 'message', id?: number | null, channelId?: number | null, posterId?: number | null, content?: string | null, postDate?: string | null } | null };

export type GetChatMessagesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', getChatMessages?: Array<{ __typename?: 'message', id?: number | null, channelId?: number | null, posterId?: number | null, content?: string | null, postDate?: string | null } | null> | null };

export type GetMessagesSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type GetMessagesSubscription = { __typename?: 'Subscription', messageSubscription?: { __typename?: 'message', id?: number | null, channelId?: number | null, posterId?: number | null, content?: string | null, postDate?: string | null } | null };

export type PostMessageMutationVariables = Exact<{
  channelId: Scalars['Int'];
  posterId: Scalars['Int'];
  content: Scalars['String'];
}>;


export type PostMessageMutation = { __typename?: 'Mutation', postMessage?: { __typename?: 'message', channelId?: number | null } | null };

export type DeletePlaylistMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePlaylistMutation = { __typename?: 'Mutation', deletePlaylist?: { __typename?: 'playlist', posterId?: number | null } | null };

export type GetPlaylistByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPlaylistByIdQuery = { __typename?: 'Query', getPlaylistById?: { __typename?: 'playlist', title?: string | null, contentIds?: Array<number | null> | null } | null };

export type GetUserPlaylistsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserPlaylistsQuery = { __typename?: 'Query', getUserPlaylists?: Array<{ __typename?: 'playlist', id?: number | null, contentIds?: Array<number | null> | null, title?: string | null } | null> | null };

export type PostPlaylistMutationVariables = Exact<{
  posterId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type PostPlaylistMutation = { __typename?: 'Mutation', postPlaylist?: { __typename?: 'playlist', contentIds?: Array<number | null> | null } | null };

export type UpdatePlaylistMutationVariables = Exact<{
  id: Scalars['Int'];
  contentIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type UpdatePlaylistMutation = { __typename?: 'Mutation', updatePlaylist?: { __typename?: 'playlist', contentIds?: Array<number | null> | null, id?: number | null, title?: string | null } | null };

export type GetAllReleasesQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetAllReleasesQuery = { __typename?: 'Query', getAllReleases?: Array<{ __typename?: 'release', id?: number | null, genres?: Array<string | null> | null, artistId?: number | null, title?: string | null, rating?: number | null, released?: string | null, ratingCount?: number | null, cover?: string | null } | null> | null };

export type GetReleaseByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetReleaseByIdQuery = { __typename?: 'Query', getReleaseById?: { __typename?: 'release', artistId?: number | null, cover?: string | null, genres?: Array<string | null> | null, language?: string | null, id?: number | null, rating?: number | null, ratingCount?: number | null, title?: string | null, released?: string | null, tracks?: Array<string | null> | null, type?: string | null } | null };

export type GetReleaseCoverQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetReleaseCoverQuery = { __typename?: 'Query', getReleaseById?: { __typename?: 'release', cover?: string | null } | null };

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
    "subscriptionType": {
      "name": "Subscription"
    },
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
            "name": "deleteChannel",
            "type": {
              "kind": "OBJECT",
              "name": "channel",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "deleteMessage",
            "type": {
              "kind": "OBJECT",
              "name": "message",
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
            "name": "deletePlaylist",
            "type": {
              "kind": "OBJECT",
              "name": "playlist",
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
            "name": "postChannel",
            "type": {
              "kind": "OBJECT",
              "name": "channel",
              "ofType": null
            },
            "args": [
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
            "name": "postMessage",
            "type": {
              "kind": "OBJECT",
              "name": "message",
              "ofType": null
            },
            "args": [
              {
                "name": "channelId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "content",
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
              }
            ]
          },
          {
            "name": "postPlaylist",
            "type": {
              "kind": "OBJECT",
              "name": "playlist",
              "ofType": null
            },
            "args": [
              {
                "name": "contentIds",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
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
            "name": "updateChannel",
            "type": {
              "kind": "OBJECT",
              "name": "channel",
              "ofType": null
            },
            "args": [
              {
                "name": "open",
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
            "name": "updatePlaylist",
            "type": {
              "kind": "OBJECT",
              "name": "playlist",
              "ofType": null
            },
            "args": [
              {
                "name": "contentIds",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
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
            "name": "getAllChannels",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "channel",
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
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "take",
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
            "name": "getChannelById",
            "type": {
              "kind": "OBJECT",
              "name": "channel",
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
            "name": "getChatMessages",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "message",
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
            "name": "getMessageById",
            "type": {
              "kind": "OBJECT",
              "name": "message",
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
            "name": "getPlaylistById",
            "type": {
              "kind": "OBJECT",
              "name": "playlist",
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
            "name": "getUserPlaylists",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "OBJECT",
                "name": "playlist",
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
        "name": "Subscription",
        "fields": [
          {
            "name": "messageSubscription",
            "type": {
              "kind": "OBJECT",
              "name": "message",
              "ofType": null
            },
            "args": [
              {
                "name": "channelId",
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
        "name": "channel",
        "fields": [
          {
            "name": "id",
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
        "name": "message",
        "fields": [
          {
            "name": "channelId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "content",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "playlist",
        "fields": [
          {
            "name": "contentIds",
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
            "name": "posterId",
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
export const GetChannelNameDocument = gql`
    query getChannelName($id: Int!) {
  getChannelById(id: $id) {
    title
  }
}
    `;

export function useGetChannelNameQuery(options: Omit<Urql.UseQueryArgs<GetChannelNameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetChannelNameQuery, GetChannelNameQueryVariables>({ query: GetChannelNameDocument, ...options });
};
export const GetAllChannelsDocument = gql`
    query getAllChannels {
  getAllChannels {
    id
    title
    releaseId
  }
}
    `;

export function useGetAllChannelsQuery(options?: Omit<Urql.UseQueryArgs<GetAllChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllChannelsQuery, GetAllChannelsQueryVariables>({ query: GetAllChannelsDocument, ...options });
};
export const DeleteMessageDocument = gql`
    mutation deleteMessage($id: Int!) {
  deleteMessage(id: $id) {
    id
    channelId
    posterId
    content
    postDate
  }
}
    `;

export function useDeleteMessageMutation() {
  return Urql.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument);
};
export const GetChatMessagesDocument = gql`
    query getChatMessages($id: Int!) {
  getChatMessages(id: $id) {
    id
    channelId
    posterId
    content
    postDate
  }
}
    `;

export function useGetChatMessagesQuery(options: Omit<Urql.UseQueryArgs<GetChatMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>({ query: GetChatMessagesDocument, ...options });
};
export const GetMessagesDocument = gql`
    subscription getMessages($channelId: Int!) {
  messageSubscription(channelId: $channelId) {
    id
    channelId
    posterId
    content
    postDate
  }
}
    `;

export function useGetMessagesSubscription<TData = GetMessagesSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetMessagesSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<GetMessagesSubscription, TData>) {
  return Urql.useSubscription<GetMessagesSubscription, TData, GetMessagesSubscriptionVariables>({ query: GetMessagesDocument, ...options }, handler);
};
export const PostMessageDocument = gql`
    mutation postMessage($channelId: Int!, $posterId: Int!, $content: String!) {
  postMessage(channelId: $channelId, posterId: $posterId, content: $content) {
    channelId
  }
}
    `;

export function usePostMessageMutation() {
  return Urql.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument);
};
export const DeletePlaylistDocument = gql`
    mutation deletePlaylist($id: Int!) {
  deletePlaylist(id: $id) {
    posterId
  }
}
    `;

export function useDeletePlaylistMutation() {
  return Urql.useMutation<DeletePlaylistMutation, DeletePlaylistMutationVariables>(DeletePlaylistDocument);
};
export const GetPlaylistByIdDocument = gql`
    query getPlaylistById($id: Int!) {
  getPlaylistById(id: $id) {
    title
    contentIds
  }
}
    `;

export function useGetPlaylistByIdQuery(options: Omit<Urql.UseQueryArgs<GetPlaylistByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPlaylistByIdQuery, GetPlaylistByIdQueryVariables>({ query: GetPlaylistByIdDocument, ...options });
};
export const GetUserPlaylistsDocument = gql`
    query getUserPlaylists($id: Int!) {
  getUserPlaylists(id: $id) {
    id
    contentIds
    title
  }
}
    `;

export function useGetUserPlaylistsQuery(options: Omit<Urql.UseQueryArgs<GetUserPlaylistsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserPlaylistsQuery, GetUserPlaylistsQueryVariables>({ query: GetUserPlaylistsDocument, ...options });
};
export const PostPlaylistDocument = gql`
    mutation postPlaylist($posterId: Int!, $title: String!) {
  postPlaylist(posterId: $posterId, title: $title) {
    contentIds
  }
}
    `;

export function usePostPlaylistMutation() {
  return Urql.useMutation<PostPlaylistMutation, PostPlaylistMutationVariables>(PostPlaylistDocument);
};
export const UpdatePlaylistDocument = gql`
    mutation updatePlaylist($id: Int!, $contentIds: [Int!]) {
  updatePlaylist(id: $id, contentIds: $contentIds) {
    contentIds
    id
    title
  }
}
    `;

export function useUpdatePlaylistMutation() {
  return Urql.useMutation<UpdatePlaylistMutation, UpdatePlaylistMutationVariables>(UpdatePlaylistDocument);
};
export const GetAllReleasesDocument = gql`
    query getAllReleases($take: Int!, $skip: Int!) {
  getAllReleases(take: $take, skip: $skip) {
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

export function useGetAllReleasesQuery(options: Omit<Urql.UseQueryArgs<GetAllReleasesQueryVariables>, 'query'>) {
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
export const GetReleaseCoverDocument = gql`
    query getReleaseCover($id: Int!) {
  getReleaseById(id: $id) {
    cover
  }
}
    `;

export function useGetReleaseCoverQuery(options: Omit<Urql.UseQueryArgs<GetReleaseCoverQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReleaseCoverQuery, GetReleaseCoverQueryVariables>({ query: GetReleaseCoverDocument, ...options });
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