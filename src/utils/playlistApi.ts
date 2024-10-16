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

// 내 플레이리스트 불러오기

export const fetchPlaylist = async (offset = 0, limit = 5) => {
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

// 추천 플레이리스트 불러오기
export const recommandPlaylist = async (offset = 0, limit = 5) => {
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

// 플레이리스트에 곡 추가하기
export const addPlaylist = async (playlistId: string | null, uri: string) => {
  const accessToken = await getPrivateAccessToken();
  const res = await axios.post(
    `${BASEURL}/playlists/${playlistId}/tracks`,
    {
      uris: [uri],
      position: 0
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};

// 플레이리스트에서 트랙 삭제하기
export const removeTrackFromPlaylist = async (playlistId: string, trackUri: string) => {
  const accessToken = await getPrivateAccessToken();

  const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: {
      tracks: [{ uri: trackUri }]
    }
  });

  return response.data;
};

// 항목 검색 (곡 & 아티스트)
export const searchMenu = async (query: string | null) => {
  const accessToken = await getPrivateAccessToken();

  const res = await axios.get(`${BASEURL}/search`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      q: query,
      type: "track,artist",
      limit: 10
    }
  });

  return res.data.tracks.items;
};

// 플레이리스트 불러오기
export const getPlaylist = async (playlistId: string | null) => {
  const accessToken = await getPrivateAccessToken();
  const res = await axios.get(`${BASEURL}/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  return res.data;
};

// 재생바 실행 -----------------------------
// 재생 시작 API 호출
export const playTrack = async (trackUri: string | null, position: number) => {
  const accessToken = await getPrivateAccessToken();

  try {
    const response = await axios.put(
      `${BASEURL}/me/player/play`,
      {
        uris: [trackUri],
        position_ms: position
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error playing track:", error);
    throw error;
  }
};

// 일시 정지 API 호출
export const pauseTrack = async () => {
  const accessToken = await getPrivateAccessToken();
  try {
    await axios.put(
      `${BASEURL}/me/player/pause`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    const response = await axios.get(`${BASEURL}/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.data && response.data.item) {
      return response.data.progress_ms;
    }
    return 0;
  } catch (error) {
    console.error("Error pausing track:", error);
    throw error;
  }
};
