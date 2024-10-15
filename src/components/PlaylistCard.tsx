import { Playlists } from "@/types/playlist";
import Image from "next/image";
import React from "react";

interface PlaylistCardProps {
  playlist: Playlists;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  if (!playlist) {
    return <div>플레이리스트가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[130px]  rounded">
        {playlist.images && playlist.images.length > 0 && (
          <Image src={playlist.images[0].url} alt={playlist.name} width={130} height={130} style={{ height: "auto" }} />
        )}
      </div>
      <p className="text-center text-sm w-[130px] h-[1rem] font-semibold">{playlist.name}</p>
    </div>
  );
};

export default PlaylistCard;
