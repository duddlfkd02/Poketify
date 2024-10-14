import { fetchPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import PlaylistCard from "./PlaylistCard";
import { Playlists } from "@/types/playlist";
import React, { useState } from "react";

interface MyPlaylistProps {
  onPlaylistSelect: (id: string) => void;
}

const MyPlaylist = ({ onPlaylistSelect }: MyPlaylistProps) => {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const {
    data: myplaylist,
    isLoading,
    error
  } = useQuery<{ items: Playlists[] }>({
    queryKey: ["myPlaylist", offset],
    queryFn: () => fetchPlaylist(offset, limit)
  });

  const handleNextPage = () => {
    if (myplaylist && myplaylist.items.length === limit) {
      setOffset((prev) => prev + limit);
    }
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  const scrollToNext = () => {
    const container = document.getElementById("playlist-container");
    if (container) {
      container.scrollTo({
        left: container.scrollLeft + container.offsetWidth,
        behavior: "smooth" // 부드러운 스크롤
      });
      handleNextPage(); // 다음 페이지로 이동
    }
  };

  const scrollToPrev = () => {
    const container = document.getElementById("playlist-container");
    if (container) {
      container.scrollTo({
        left: container.scrollLeft - container.offsetWidth
      });
      handlePrevPage(); // 이전 페이지로 이동
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>플레이리스트를 불러오는 데 실패했습니다. 다시 시도해 주세요.</div>;
  }

  if (!myplaylist || !Array.isArray(myplaylist.items)) {
    return <div>playlist가 없습니다</div>;
  }

  return (
    <div className="flex flex-col gap-8 pt-4 bg-blue-50 p-4 rounded">
      <h3 className="font-bold text-playlist-h3 text-left">내 플레이리스트</h3>
      <div className="flex justify-between items-center">
        <button onClick={scrollToPrev} disabled={offset === 0} className="bg-gray-300 rounded p-2">
          이전
        </button>
        <div
          id="playlist-container"
          className="flex gap-4 p-2 overflow-x-auto scroll-smooth 
           w-full justify-center"
        >
          <ul className="w-full list-none flex justify-start gap-4">
            {myplaylist.items.map((playlist) => (
              <li key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)} className="cursor-pointer">
                <PlaylistCard playlist={playlist} />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={scrollToNext} disabled={myplaylist.items.length < limit} className="bg-gray-300 rounded p-2">
          다음
        </button>
      </div>
    </div>
  );
};

export default MyPlaylist;
