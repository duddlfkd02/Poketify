let accessToken: string | null = null;
let expireToken: number | null = null;

// Access Token 받기
export async function getAccessToken() {
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

  const data = await res.json();
  console.log("토큰 응답 데이터:", data); //

  accessToken = data.access_token;
  expireToken = Date.now() + data.expires_in * 1000;

  return accessToken;
}

// Spotify API에서 검색 요청
export async function searchTracks(query: string) {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Spotify API 요청 실패: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Spotify 검색 결과:", data);
  return data.tracks.items;
}
