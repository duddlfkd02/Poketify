const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string;

// 스포티파이 api 요청을 위한 토큰 받아오는 함수
const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET
  });

  // fetch 부분
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    // 쿼리스트링 형식으로 요청을 보냄
    body: params.toString()
  });

  // 토큰만 구조분해 할당으로 받아옴
  const { access_token: token } = await res.json();
  return token;
};

export default getAccessToken;
