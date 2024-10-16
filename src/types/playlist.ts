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

export interface Track {
  id: string;
  name: string;
  album: AlbumList;
  artists: ArtistList[];
  external_urls: {
    spotify: string;
  };
  uri: string;
}

export interface TrackList {
  track: Track;
}

export interface PlaylistData {
  name: string;
  tracks: {
    items: TrackList[];
  };
}

export interface SongMenu {
  id: string;
  name: string;
  uri: string; // 여기에 uri 추가
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
}
