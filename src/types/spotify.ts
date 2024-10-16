// 아티스트 타입
interface Artist {
  name: string;
  id: string;
  uri: string;
  external_urls: {
    spotify: string;
  }; // 추가
}

// 앨범 이미지 타입
interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

// 앨범 타입
interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

// 트랙 타입
export interface SpotifyNewTrack {
  track: {
    album: Album;
    artists: Artist[];
    name: string;
    id: string;
    uri: string;
    external_urls: {
      spotify: string;
    }; // 추가
  };
}

export interface SpotifyAnimelistTrack {
  track: {
    album: Album;
    artists: Artist[];
    name: string;
    id: string;
    uri: string;
    external_urls: {
      spotify: string;
    }; // 추가
  };
}

export interface SpotifyFeatured {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

export interface FeaturedPlaylistsResponse {
  playlists: {
    href: string;
    items: SpotifyFeatured[];
  };
}
