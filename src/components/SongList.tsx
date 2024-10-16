import { fetchSongsByPlaylist, removeTrackFromPlaylist } from "@/utils/playlistApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Image from "next/image";
import { PlaylistData } from "@/types/playlist";

interface SongListProps {
  playlistId: string | null;
}

const SongList = ({ playlistId }: SongListProps) => {
  const queryClient = useQueryClient();
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null); // 트랙 ID 상태 관리

  // 곡 목록 가져오기
  const {
    data: playlistData,
    isLoading,
    error
  } = useQuery<PlaylistData>({
    queryKey: ["songList", playlistId],
    queryFn: () => fetchSongsByPlaylist(playlistId!),
    enabled: !!playlistId
  });

  // 트랙 삭제 뮤테이션
  const removeTrackMutation = useMutation({
    mutationFn: (trackUri: string) => removeTrackFromPlaylist(playlistId!, trackUri),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["songList", playlistId]
      });
    },
    onError: () => {
      alert("트랙을 삭제하는 데 실패했습니다.");
    }
  });

  const handleRemoveTrack = (trackUri: string) => {
    removeTrackMutation.mutate(trackUri);
  };

  return (
    <div className="bg-blue-100 rounded p-4 h-[85vh]">
      <h3 className="text-center font-extrabold text-[1.5rem] mb-4 border-2 border-solid border-r-0 border-t-0 border-l-0 pb-4">
        TRACK LIST
      </h3>
      <ul className="h-[70vh] max-h-[70vh] overflow-y-auto">
        {isLoading && <li className="flex justify-center items-center h-full text-lg font-bold">Loading...</li>}
        {error && (
          <li className="flex justify-center items-center h-full text-lg font-bold">
            곡 목록을 불러오는 데 실패했습니다.
          </li>
        )}
        {playlistData && playlistData.tracks.items.length === 0 && (
          <li className="flex justify-center items-center h-full text-lg font-bold">재생목록이 비어있습니다.</li>
        )}
        {playlistData &&
          playlistData.tracks.items.map((song) => (
            <li
              key={song.track.id}
              className="flex items-center space-x-4 mb-2 relative border border-solid p-2 border-gray-400"
              onMouseEnter={() => setHoveredTrackId(song.track.id)} // 마우스 오버 시 트랙 ID 설정
              onMouseLeave={() => setHoveredTrackId(null)} // 마우스 리브 시 트랙 ID 초기화
            >
              <Image
                src={song.track.album.images[0]?.url}
                alt={song.track.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="h-full flex flex-col gap-2 w-[50%]  pt-4 pb-4">
                <p className="font-bold">{song.track.name}</p>
                <p>{song.track.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
              {/* 버튼의 가시성을 상태에 따라 조정 */}
              {hoveredTrackId === song.track.id && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-custom-green p-2 border border-solid"
                  onClick={() => handleRemoveTrack(song.track.uri)}
                >
                  삭제
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SongList;
