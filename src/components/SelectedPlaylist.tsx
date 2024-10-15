import React from "react";

interface SelectedPlaylist {
  playlistid: string;
}
const SelectedPlaylist = ({ playlistid }: SelectedPlaylist) => {
  return (
    <div className="bg-blue-100 h-full p-4">
      <h3 className="font-bold">선택된 플레이리스트</h3>
    </div>
  );
};

export default SelectedPlaylist;
