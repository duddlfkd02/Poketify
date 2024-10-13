import { PlaylistResponse, Playlists } from "@/types/playlist";
import { recommandPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const RecommendPlaylist = () => {
  // 추천 플레이리스트 불러오기
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
  console.log(playlists);
  return (
    <section className="flex">
      {playlists?.items.map((playlist) => (
        <div key={playlist.id}>
          <Image src={playlist.images[0]?.url} alt={playlist.name} width={100} height={100} />
          <h1>{playlist.name}</h1>
        </div>
      ))}
    </section>
  );
};

export default RecommendPlaylist;
