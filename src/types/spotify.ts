export interface SpotifyNewTrack {
  track: {
    name: string;
    album: {
      images: Array<{ url: string }>;
    };
    artists: Array<{ name: string }>;
  };
}

export interface SpotifyNewlistResponse {
  items: SpotifyNewTrack[];
}

export interface SpotifyFeatured {
  id: string;
  name: string;
  images: Array<{ url: string }>;
}

export interface FeaturedPlaylistsResponse {
  playlists: {
    items: SpotifyFeatured[];
  };
}
