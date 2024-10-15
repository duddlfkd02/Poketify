export const CommunityGetPlaylist = async (playlistId: string, token: string) => {
  const playlist = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?market=KR`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return playlist;
};
