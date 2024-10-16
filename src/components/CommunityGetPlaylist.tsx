import splitPlaylistId from "@/utils/splitPlaylistId";

export const CommunityGetPlaylist = async (playlistId: string, token: string) => {
  const playlist_id = await splitPlaylistId(playlistId);
  const playlist = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}?market=KR`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return playlist;
};
