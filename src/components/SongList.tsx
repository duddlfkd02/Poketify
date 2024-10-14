import { fetchPlaylistTracks } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SongList = ({ playlistId }) => {
  const {
    data: tracks,
    isLoading,
    error
  } = useQuery({
    queryKey: ["songList", playlistId],
    queryFn: () => fetchPlaylistTracks(playlistId)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>SongList Error</div>;
  }
  return (
    <div>
      <h3>SONG LIST</h3>
    </div>
  );
};

export default SongList;
