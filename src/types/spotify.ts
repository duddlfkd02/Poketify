export interface SpotifyTrack {
  track: {
    name: string;
    album: {
      images: Array<{ url: string }>;
    };
    artists: Array<{ name: string }>;
  };
}

export interface SpotifyPlaylistResponse {
  items: SpotifyTrack[];
}
