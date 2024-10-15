import { SearchTrack, SearchTrackResponse } from "@/types/search";

// 토큰과 관련된 전역 변수
let accessToken: string | null = null;
let expireToken: number | null = null;

// Access Token 받기
export async function getAccessToken(): Promise<string> {
  if (accessToken && expireToken && Date.now() < expireToken) {
    return accessToken;
  }

  const authParam = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      "grant_type=client_credentials&client_id=" +
      process.env.NEXT_PUBLIC_SPOTIFY_API_KEY +
      "&client_secret=" +
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
  };

  const res = await fetch("https://accounts.spotify.com/api/token", authParam);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`토큰 요청 실패: ${res.status} - ${errorData.error_description}`);
  }

  const data: { access_token: string; expires_in: number } = await res.json();
  accessToken = data.access_token;
  expireToken = Date.now() + data.expires_in * 1000;

  return accessToken;
}

// 공통 API 요청 함수
async function spotifyFetch(endpoint: string, queryParams: string = "") {
  const token = await getAccessToken();
  const url = `https://api.spotify.com/v1${endpoint}${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Spotify API 요청 실패: ${response.statusText}`);
  }

  return response.json();
}

// Spotify API에서 검색 요청
export async function searchTracks(
  query: string,
  offset: number = 0,
  limit: number = 20
): Promise<SearchTrackResponse> {
  const data: SearchTrackResponse = await spotifyFetch(
    "/search",
    `?q=${query}&type=track&limit=${limit}&offset=${offset}`
  );
  return data;
}

// 플레이리스트 신곡 불러오기
export const getSpotifyNewlistItems = async () => {
  return spotifyFetch("/playlists/37i9dQZF1DXe5W6diBL5N4/tracks");
};

/* 애니메이션 앨범 */
export const getSpotifyAnimelist = async () => {
  return spotifyFetch("/playlists/37i9dQZF1DWT8aqnwgRt92/tracks");
};

// 플레이리스트 취향? 불러오기
export const getFeaturedPlaylists = async () => {
  return spotifyFetch("/browse/featured-playlists");
};

// 상세페이지 id값으로 데이터 받아오기
export async function getTrackById(id: string): Promise<SearchTrack> {
  const data = await spotifyFetch(`/tracks/${id}`);
  return data;
}

// 추천 곡 가져오기
export async function getRecommendedTracks(id: string): Promise<SearchTrack[]> {
  const data = await spotifyFetch(`/recommendations`, `?seed_tracks=${id}&limit=5`);
  return data.tracks;
}
