import { fetchPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import PlaylistCard from "./PlaylistCard";
import { Playlists } from "@/types/playlist";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

interface MyPlaylistProps {
  onPlaylistSelect: (id: string) => void;
}

const MyPlaylist = ({ onPlaylistSelect }: MyPlaylistProps) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5); // 동적 limit 설정을 위한 state

  // 화면 크기에 따라 limit 동적 설정
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setLimit(3);
      } else if (width >= 640 && width < 1600) {
        setLimit(5);
      } else {
        setLimit(7);
      }
    };

    handleResize(); // 컴포넌트 로드 시 초기화
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    data: myplaylist,
    isLoading,
    error
  } = useQuery<{ items: Playlists[] }>({
    queryKey: ["myPlaylist", offset, limit],
    queryFn: () => fetchPlaylist(offset, limit)
  });

  const handleNextPage = () => {
    if (myplaylist && myplaylist.items?.length === limit) {
      setOffset((prev) => prev + limit);
    } else {
      setOffset(0);
    }
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  return (
    <div className="flex flex-col gap-4 pt-4 bg-blue-100 p-4 rounded min-h-full relative">
      <h3 className="font-bold text-playlist-h3 text-left">내 플레이리스트</h3>

      <div>
        <button onClick={handlePrevPage} disabled={offset === 0} className="absolute top-1/2 l-5">
          <IoMdArrowDropleft size={30} />
        </button>

        <div className="flex gap-4 overflow-hidden w-full justify-center">
          <ul className="w-[90%] list-none flex justify-center gap-4">
            {isLoading && (
              <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">Loading...</li>
            )}
            {error && (
              <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">
                플레이리스트를 불러오는 데 실패했습니다. 다시 시도해 주세요.
              </li>
            )}
            {myplaylist && Array.isArray(myplaylist.items) && myplaylist.items.length === 0 && (
              <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">
                playlist가 없습니다
              </li>
            )}
            {myplaylist?.items?.map((playlist) => (
              <li key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)} className="cursor-pointer">
                <PlaylistCard playlist={playlist} />
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleNextPage} className="absolute top-1/2 right-5">
          <IoMdArrowDropright size={30} />
        </button>
      </div>
    </div>
  );
};

export default MyPlaylist;
