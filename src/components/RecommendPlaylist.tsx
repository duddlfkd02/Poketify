import { PlaylistResponse } from "@/types/playlist";
import { recommandPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import PlaylistCard from "./PlaylistCard";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

interface RecommendPlaylistProps {
  onPlaylistSelect: (id: string) => void;
}

const RecommendPlaylist = ({ onPlaylistSelect }: RecommendPlaylistProps) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5); // 동적 limit 설정을 위한 state

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

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    data: playlists,
    isLoading,
    error
  } = useQuery<PlaylistResponse>({
    queryKey: ["recommendPlaylist", offset, limit],
    queryFn: () => recommandPlaylist(offset, limit)
  });

  const handleNextPage = () => {
    if (playlists && playlists.items.length === limit) {
      setOffset((prev) => prev + limit);
    } else {
      setOffset(0);
    }
  };

  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit));
  };

  return (
    <div className="flex flex-col justify-between gap-4 pt-4 border border-solid border-custom-skyblue  p-4  min-h-full relative">
      <h3 className="font-bold text-left text-[1.3rem]">추천 플레이리스트</h3>
      <div className="min-h-[90%]">
        <button onClick={handlePrevPage} disabled={offset === 0} className="absolute top-1/2 left-5">
          <IoMdArrowDropleft size={30} />
        </button>
        <div className="flex gap-4 overflow-hidden w-full justify-center ">
          <ul className="w-[30%] flex list-none gap-4 items-center justify-center ">
            {isLoading && (
              <li className="flex justify-center items-center w-full text-lg font-bold min-h-[130px]">Loading...</li>
            )}
            {error && (
              <li className="flex justify-center items-center w-full text-lg font-bold min-h-[130px]">
                플레이리스트를 불러오는 데 실패했습니다. 다시 시도해 주세요.
              </li>
            )}
            {playlists &&
              playlists.items.map((playlist) => (
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

export default RecommendPlaylist;
