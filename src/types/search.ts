export type SearchTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[]; release_date: string };
  popularity: number;
};
