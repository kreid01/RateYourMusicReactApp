export type IRelease = {
  id: number;
  artistId: number;
  title: string;
  type: string;
  recorded: string;
  ratingCount: number;
  rating: number;
  cover: string;
  language: string;
  genres: string[];
  tracks: string[];
};
