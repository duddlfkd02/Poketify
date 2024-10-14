import { PlaylistResponse } from "@/types/playlist";
import Image from "next/image";
import React from "react";

interface PlaylistCardProps {
  playlist: PlaylistResponse;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  if (!playlist?.items || playlist.items.length === 0) {
    return <div>플레이리스트가 없습니다.</div>;
  }

  return (
    <div className="flex gap-4">
      {playlist.items.map((p) => (
        <div key={p.id} className="flex flex-col gap-2">
          <div className="w-[130px] h-auto">
            {p.images && p.images.length > 0 && (
              <Image src={p.images[0].url} alt={p.name} width={130} height={130} style={{ height: "auto" }} />
            )}
          </div>
          <p className="text-center">{p.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistCard;
