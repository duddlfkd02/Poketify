export type SearchTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[]; release_date: string };
  popularity: number;
};

export type SearchTrackResponse = {
  tracks: {
    href: string;
    items: SearchTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
};
