import getAccessToken from "./getAccessToken"; // accessToken을 가져오는 함수

const BASEURL = "https://api.spotify.com/v1/playlists";

// 공통 헤더 작성
const getHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`
});

// 데이터 불러오기
export const fetchPlaylist = async (playlistId: string) => {
  const accessToken = await getAccessToken(); // accessToken 가져오기

  const res = await fetch(`${BASEURL}/${playlistId}`, {
    method: "GET",
    headers: getHeaders(accessToken)
  });

  if (!res.ok) {
    throw new Error("fetch 실패");
  }
  const playlistData = await res.json();
  console.log(playlistData);
  return playlistData;
};

// 데이터 추가하기
export const addPlaylist = async (newSong: string) => {
  const accessToken = await getAccessToken(); // accessToken 가져오기

  const res = await fetch(BASEURL, {
    method: "POST",
    headers: getHeaders(accessToken),
    body: JSON.stringify({ uris: [newSong] })
  });

  if (!res.ok) {
    throw new Error("add 실패");
  }

  const addedData = await res.json();
  return addedData;
};

// 데이터 삭제하기
export const deletePlaylist = async (id: string) => {
  const accessToken = await getAccessToken(); // accessToken 가져오기

  const res = await fetch(`${BASEURL}/${id}/followers`, {
    method: "DELETE",
    headers: getHeaders(accessToken)
  });

  if (!res.ok) {
    throw new Error("delete 실패");
  }

  const deletedData = await res.json();
  return deletedData;
};

// 추천 재생목록 불러오기
export const recommandPlaylist = async () => {
  const accessToken = await getAccessToken(); // accessToken 가져오기

  const res = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
    method: "GET",
    headers: getHeaders(accessToken)
  });

  if (!res.ok) {
    throw new Error("추천 재생목록 fetch 실패");
  }

  const recommendedData = await res.json();
  const playlists = recommendedData.playlists;
  console.log(playlists);
  return playlists;
};
