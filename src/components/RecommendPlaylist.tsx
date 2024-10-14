import { PlaylistResponse } from "@/types/playlist";
import { recommandPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PlaylistCard from "./PlaylistCard";

const RecommendPlaylist = () => {
  const {
    data: playlists,
    isLoading,
    error
  } = useQuery<PlaylistResponse>({
    queryKey: ["playlist"],
    queryFn: recommandPlaylist
  });

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  if (!playlists) {
    return <div>playlist가 없습니다</div>;
  }
  return (
    <div className="flex flex-col justify-between gap-4 pt-4 bg-blue-50 p-4 rounded ">
      <h3 className="font-extrabold text-playlist-h3 text-left">추천 플레이리스트</h3>

      <PlaylistCard playlist={playlists} />
    </div>
  );
};

export default RecommendPlaylist;
