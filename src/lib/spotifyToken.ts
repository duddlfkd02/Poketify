import { SearchTrack, SearchTrackResponse } from "@/types/search";

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
  console.log("토큰 응답 데이터:", data);

  accessToken = data.access_token;
  expireToken = Date.now() + data.expires_in * 1000;

  return accessToken;
}

// Spotify API에서 검색 요청
export async function searchTracks(
  query: string,
  offset: number = 0,
  limit: number = 20
): Promise<SearchTrackResponse> {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify API 요청 실패: ${response.statusText}`);
  }
  const data: SearchTrackResponse = await response.json();
  console.log("Spotify 검색 결과:", data);
  return data;
}

export const getSpotifyNewlistItems = async (token: string) => {
  const res = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DXe5W6diBL5N4/tracks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

export const getFeaturedPlaylists = async (token: string) => {
  const res = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

//상세페이지 id값으로 데이터 받아오기
export async function getTrackById(id: string): Promise<SearchTrack> {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("곡 정보를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data;
}

// 추천 곡 가져오는 함수
export async function getRecommendedTracks(id: string): Promise<SearchTrack[]> {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=5`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("추천 곡 정보를 불러오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data.tracks;
}
