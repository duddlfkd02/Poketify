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

export interface ArtistList {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

export interface AlbumList {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}
export interface TrackList {
  track: {
    id: string;
    name: string;
    album: AlbumList;
    artists: ArtistList[];
    external_urls: {
      spotify: string;
    };
  };
}
