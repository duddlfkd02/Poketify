import { fetchSongsByPlaylist, playTrack, removeTrackFromPlaylist } from "@/utils/playlistApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Image from "next/image";
import { PlaylistData } from "@/types/playlist";
import { useTrackStore } from "@/store/useTrackStore";
import { IoClose, IoPlayCircleSharp } from "react-icons/io5";

interface SongListProps {
  playlistId: string | null;
}

const SongList = ({ playlistId }: SongListProps) => {
  const queryClient = useQueryClient();
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const setTrackUri = useTrackStore((state) => state.setTrackUri);

  // 곡 재생
  const handlePlayTrack = async (trackUri: string) => {
    const currentPosition = useTrackStore.getState().currentPosition;
    setTrackUri(trackUri);
    try {
      await playTrack(trackUri, currentPosition);
    } catch (error) {
      console.error("트랙 재생 실패:", error);
    }
  };
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
    <ul
      className={`max-h-[33vh] md:max-h-[55vh] overflow-y-auto mt-4 ${
        playlistData && "border-2 border-solid border-custom-blue rounded p-2"
      }`}
    >
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
            className="flex items-center gap-4 mb-2 relative border border-solid py-3 px-4 border-gray-400"
            onMouseEnter={() => setHoveredTrackId(song.track.id)}
            onMouseLeave={() => setHoveredTrackId(null)}
          >
            <Image
              src={song.track.album.images[0]?.url}
              alt={song.track.name}
              width={80}
              height={80}
              className="rounded"
            />

            <div className="h-full flex flex-col gap-2 w-[50%] mr-auto pt-4 pb-4">
              <p className="font-bold">{song.track.name}</p>
              <p>{song.track.artists.map((artist) => artist.name).join(", ")}</p>
            </div>

            <button className="cursor-pointer" onClick={() => handlePlayTrack(song.track.uri)}>
              <IoPlayCircleSharp size={40} className="fill-custom-blue" />
            </button>
            {hoveredTrackId === song.track.id && (
              <button className="absolute right-2 top-2  text-sm" onClick={() => handleRemoveTrack(song.track.uri)}>
                <IoClose size={20} />
              </button>
            )}
          </li>
        ))}
    </ul>
  );
};

export default SongList;
