import { getPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface SelectedPlaylist {
  playlistid: string | null;
}
const SelectedPlaylist = ({ playlistid }: SelectedPlaylist) => {
  const {
    data: selectPlaylist,
    isLoading,
    error
  } = useQuery({
    queryKey: ["selectPlaylist", playlistid],
    queryFn: () => getPlaylist(playlistid)
  });
  return (
    <div className="bg-blue-100 h-full p-4">
      <h3 className="font-bold mb-4">선택된 플레이리스트</h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>플레이리스트를 불러오던 중 에러가 발생했습니다</div>}
      {!selectPlaylist || selectPlaylist.length === 0 ? <div>선택된 플레이스트가 없습니다</div> : <div>우아</div>}
    </div>
  );
};

export default SelectedPlaylist;
