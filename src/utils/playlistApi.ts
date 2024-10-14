import axios from "axios";
import { getAccessToken } from "./getAccessToken";

const BASEURL = "https://api.spotify.com/v1";

// 재생목록 항목 가져오기
export const fetchPlaylistTracks = async (playlist_id: string | null) => {
  const accessToken = await getAccessToken();

  const res = await axios.get(`${BASEURL}/playlists/${playlist_id}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  console.log(res.data);
  return res.data;
};

// 플레이리스트 불러오기
export const fetchPlaylist = async () => {
  const accessToken = await getAccessToken();

  const res = await axios.get(`${BASEURL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  console.log(res.data);
  return res.data;
};

// 플레이리스트에 곡 추가하기
export const addPlaylist = async (playlistId: string, newSongUri: string) => {
  const accessToken = await getAccessToken();

  const res = await axios.post(
    `${BASEURL}/playlists/${playlistId}/tracks`,
    { uris: [newSongUri] },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.playlist;
};

// 플레이리스트 삭제하기
export const deletePlaylist = async (playlistId: string) => {
  const accessToken = await getAccessToken();

  const res = await axios.delete(`${BASEURL}/playlists/${playlistId}/followers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  return res.data;
};

// 추천 플레이리스트 불러오기
export const recommandPlaylist = async () => {
  const accessToken = await getAccessToken();

  const res = await axios.get(`${BASEURL}/browse/featured-playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  console.log(res.data);
  return res.data.playlists;
};
