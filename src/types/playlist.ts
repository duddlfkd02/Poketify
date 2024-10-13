export interface Playlists {
  id: string;
  images: {
    url: PlaylistImage[];
  };
  name: string;
}

export interface PlaylistImage {
  url: string;
  [0]: string;
}

export interface PlaylistResponse {
  items: Playlists[];
}
