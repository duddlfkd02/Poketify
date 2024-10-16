const splitPlaylistId = async (playlistId: string) => {
  const id = playlistId.indexOf("playlist/") !== -1 ? playlistId.split("playlist/")[1] : playlistId;
  return id;
};
export default splitPlaylistId;
