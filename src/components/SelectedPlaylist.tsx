import { getPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

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
    <div className="border border-solid border-custom-skyblue rounded h-full p-4">
      <h3 className="font-bold mb-4 text-[1.3rem] text-center bg-gray-200 pt-2 pb-2">현재 플레이리스트</h3>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center">로그인 후 사용가능합니다.</div>}
      {!selectPlaylist ? (
        <div className="text-center mt-4">선택된 플레이리스트가 없습니다</div>
      ) : (
        <div className="flex justify-center gap-10 items-center">
          <div className="border border-solid border-gray-400 rounded flex-grow h-[130px] flex justify-center items-center">
            <h4 className="font-bold text-[1.5rem] ">{selectPlaylist.name}</h4>
          </div>
          {selectPlaylist.images && selectPlaylist.images.length > 0 && (
            <Image
              src={selectPlaylist.images[0].url}
              alt={selectPlaylist.name}
              width={130}
              height={130}
              className="h-auto rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedPlaylist;
