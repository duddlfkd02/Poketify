export interface PlaylistImage {
  url: string;
}

export interface Playlists {
  id: string;
  images: PlaylistImage[];
  name: string;
}

export interface PlaylistResponse {
  items: Playlists[];
}
