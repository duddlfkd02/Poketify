import { PlaylistResponse } from "@/types/playlist";
import { recommandPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";

interface RecommendPlaylistProps {
  onPlaylistSelect: (id: string) => void; // onPlaylistSelect props 타입 정의
}

const RecommendPlaylist = ({ onPlaylistSelect }: RecommendPlaylistProps) => {
  // 페이지네이션 상태 관리
  const [offset, setOffset] = useState(0);
  const limit = 5; // 한 번에 가져올 아이템 수를 5로 설정

  // 추천 플레이리스트 불러오기
  const {
    data: playlists,
    isLoading,
    error
  } = useQuery<PlaylistResponse>({
    queryKey: ["recommendPlaylist", offset], // offset을 쿼리 키에 추가
    queryFn: () => recommandPlaylist(offset, limit) // offset과 limit을 인자로 넘김
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>플레이리스트를 불러오는 데 실패했습니다. 다시 시도해 주세요.</div>;
  }

  if (!playlists || !Array.isArray(playlists.items) || playlists.items.length === 0) {
    return <div>playlist가 없습니다</div>;
  }

  // 다음 페이지로 이동하는 함수
  const handleNextPage = () => {
    if (playlists.items.length === limit) {
      setOffset((prev) => prev + limit); // limit 만큼 더하여 다음 페이지로 이동
    }
  };

  // 이전 페이지로 이동하는 함수
  const handlePrevPage = () => {
    setOffset((prev) => Math.max(0, prev - limit)); // 0보다 작지 않게 조정
  };

  return (
    <div className="flex flex-col justify-between gap-4 pt-4 bg-blue-50 p-4 rounded">
      <h3 className="font-bold text-playlist-h3 text-left">추천 플레이리스트</h3>
      <div className="flex justify-between items-center">
        <button onClick={handlePrevPage} disabled={offset === 0} className="bg-gray-300 rounded p-2">
          이전
        </button>
        <div className="flex gap-4 overflow-hidden w-full justify-center">
          <ul className="w-[90%] flex list-none gap-4 justify-start">
            {playlists.items.map((playlist) => (
              <li key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)} className="cursor-pointer">
                <PlaylistCard playlist={playlist} />
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleNextPage} disabled={playlists.items.length < limit} className="bg-gray-300 rounded p-2">
          다음
        </button>
      </div>
    </div>
  );
};

export default RecommendPlaylist;
