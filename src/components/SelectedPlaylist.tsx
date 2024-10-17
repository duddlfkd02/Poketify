import { getPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import SearchSong from "./SearchSong";

interface SelectedPlaylistProps {
  playlistId: string | null;
}

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({ playlistId }) => {
  const {
    data: selectPlaylist,
    isLoading,
    error
  } = useQuery({
    queryKey: ["selectPlaylist", playlistId],
    queryFn: () => getPlaylist(playlistId),
    enabled: !!playlistId
  });

  return (
    <div className="">
      <h3 className="text-left text-2xl md:text-3xl font-bold mb-5">현재 플레이리스트</h3>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center">로그인 후 사용가능합니다.</div>}
      {!selectPlaylist ? (
        <div className="text-center mt-4">선택된 플레이리스트가 없습니다</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            {selectPlaylist.images && selectPlaylist.images.length > 0 && (
              <Image
                src={selectPlaylist.images[0].url}
                alt={selectPlaylist.name}
                width={130}
                height={130}
                unoptimized
                className="h-auto rounded"
              />
            )}

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-[1.5rem] ">{selectPlaylist.name}</h4>
              <div className="leading-tight">{selectPlaylist.description}</div>
            </div>
          </div>
          <SearchSong playlistId={playlistId} />
        </div>
      )}
    </div>
  );
};

export default SelectedPlaylist;
