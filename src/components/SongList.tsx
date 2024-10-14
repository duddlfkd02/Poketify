import { fetchSongsByPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Image from "next/image";
import { PlaylistData, TrackList } from "@/types/playlist";

interface SongListProps {
  playlistId: string | null;
}

const SongList = ({ playlistId }: SongListProps) => {
  const {
    data: playlistData,
    isLoading,
    error
  } = useQuery<PlaylistData>({
    queryKey: ["songList", playlistId],
    queryFn: () => fetchSongsByPlaylist(playlistId!),
    enabled: !!playlistId
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>곡 목록을 불러오는 데 실패했습니다.</div>;
  }

  if (!playlistData || !playlistData.tracks || !Array.isArray(playlistData.tracks.items)) {
    return (
      <div className="bg-blue-50 p-4 h-[85vh] flex justify-center items-center font-bold">재생목록을 선택해주세요</div>
    );
  }

  return (
    <div className="bg-blue-50 p-4 h-[85vh]">
      <h3 className="text-center font-extrabold text-[1.5rem] mb-4">{playlistData.name}</h3>
      <ul className="max-h-[80vh] overflow-y-auto ">
        {playlistData.tracks.items.map((song) => (
          <li key={song.track.id} className="flex items-center space-x-4 mb-2">
            <Image
              src={song.track.album.images[0]?.url}
              alt={song.track.name}
              width={80}
              height={80}
              className="rounded"
            />
            <div className="h-[full] flex flex-col gap-2">
              <p className="font-bold">{song.track.name}</p>
              <p>{song.track.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
