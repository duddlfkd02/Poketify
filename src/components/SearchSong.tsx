import { SongMenu } from "@/types/playlist";
import { addPlaylist, searchMenu } from "@/utils/playlistApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

// Throttle 함수
const useThrottle = <T,>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledValue(value);
    }, limit);

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

const SearchSong: React.FC<{ playlistId: string }> = ({ playlistId }) => {
  const [song, setSong] = useState<string>("");
  const throttledSong = useThrottle(song, 300);
  const queryClient = useQueryClient();

  const { data: searchResult = [], error } = useQuery<SongMenu[], Error>({
    queryKey: ["searchSong", throttledSong],
    queryFn: () => searchMenu(throttledSong),
    enabled: !!throttledSong,
    staleTime: 5000
  });

  // 곡 추가 뮤테이션
  const addTrackMutation = useMutation({
    mutationFn: (uri: string) => addPlaylist(playlistId, uri),
    onSuccess: () => {
      queryClient.invalidateQueries(["getPlaylistTracks", playlistId]);
      setSong("");
    }
  });

  const handleAddTrack = (uri: string) => {
    addTrackMutation.mutate(uri);
  };
  console.log("playlistIdplaylistIdplaylistId", playlistId);

  if (error) {
    return <div>곡을 찾아 오는 도중 에러가 발생했습니다.</div>;
  }

  return (
    <div className="relative flex flex-col gap-4 pt-4 border border-solid border-custom-blue p-4 rounded h-full ">
      <h3 className="font-bold text-[1.3rem] text-center bg-gray-200 pt-2 pb-2">곡을 찾아서 재생목록에 추가하세요</h3>
      <input
        type="search"
        placeholder="곡을 입력해주세요"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        className="w-full h-[2.5rem] p-2 focus:outline-none bg-blue-100 pl-4 mx-auto"
      />
      {throttledSong && (
        <div className="absolute top-24 left-4 bg-white border mt-2 p-4 w-[calc(100%-2rem)] z-10">
          <ul className="flex flex-col max-h-[29rem] overflow-y-auto">
            {searchResult.length > 0 ? (
              searchResult.map((result) => (
                <li
                  key={result.id}
                  className="flex items-center gap-5 relative mb-4 h-full border border-solid border-custom-skyblue p-2 rounded"
                >
                  <Image src={result.album.images[0].url} alt={result.name} width={50} height={50} />
                  <div className="w-[60%]">
                    <p className="font-semibold mb-2">{result.name}</p>
                    <p>{result.artists.map((artist) => artist.name).join(", ")}</p>
                  </div>
                  <button className="absolute right-2 cursor-pointer" onClick={() => handleAddTrack(result.uri)}>
                    <FaRegSquarePlus size={20} />
                  </button>
                </li>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSong;
