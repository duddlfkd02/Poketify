const splitPlaylistId = async (playlistId: string) => {
  const id = playlistId.split("playlist/")[1];
  return id;
};
export default splitPlaylistId;
