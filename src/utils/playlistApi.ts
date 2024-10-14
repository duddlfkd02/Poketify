import axios from "axios";
import { getPrivateAccessToken } from "./getPrivateAccessToken";
import { getAccessToken } from "@/lib/spotifyToken";

const BASEURL = "https://api.spotify.com/v1";

// 재생목록 항목 가져오기
export const fetchSongsByPlaylist = async (playlistId: string) => {
  const accessToken = await getPrivateAccessToken();

  const res = await axios.get(`${BASEURL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return res.data;
};

// 내 플레이리스트 불러오기 (페이지네이션 추가)
export const fetchPlaylist = async (offset = 0, limit = 20) => {
  const accessToken = await getPrivateAccessToken();

  const res = await axios.get(`${BASEURL}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      offset: offset,
      limit: limit
    }
  });

  return res.data;
};

// 플레이리스트에 곡 추가하기
export const addPlaylist = async (playlistId: string, newSongUri: string) => {
  const accessToken = await getPrivateAccessToken();

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

  return res.data;
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

// 추천 플레이리스트 불러오기 (페이지네이션 추가)
export const recommandPlaylist = async (offset = 0, limit = 20) => {
  const accessToken = await getAccessToken();

  const res = await axios.get(`${BASEURL}/browse/featured-playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    params: {
      offset: offset,
      limit: limit
    }
  });

  return res.data.playlists;
};
