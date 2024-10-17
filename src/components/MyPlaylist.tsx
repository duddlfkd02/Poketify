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
  const [limit, setLimit] = useState(5);

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
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-left text-2xl md:text-3xl font-bold ">내 플레이리스트</h3>

        <div className="flex gap-2">
          <button onClick={handlePrevPage} disabled={offset === 0}>
            <IoMdArrowDropleft size={30} />
          </button>
          <button onClick={handleNextPage}>
            <IoMdArrowDropright size={30} />
          </button>
        </div>
      </div>

      <ul className=" list-none flex  gap-4">
        {isLoading && (
          <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">Loading...</li>
        )}
        {error && (
          <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">
            로그인 후 사용가능합니다
          </li>
        )}
        {myplaylist && Array.isArray(myplaylist.items) && myplaylist.items.length === 0 && (
          <li className="flex justify-center items-center w-full h-[100px] text-lg font-bold">playlist가 없습니다</li>
        )}
        {myplaylist?.items?.map((playlist) => (
          <li key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)} className="cursor-pointer ">
            <PlaylistCard playlist={playlist} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPlaylist;
