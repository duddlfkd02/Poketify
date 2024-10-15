import { searchMenu } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const SearchSong = () => {
  const [song, setSong] = useState("");
  const {
    data: searchsong,
    isLoading,
    error
  } = useQuery({
    queryKey: ["searchSong"],
    queryFn: searchMenu
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>곡을 찾아 오는 도중 에러가 발생했습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-8 pt-4 bg-blue-50 p-4 rounded h-full">
      <h3>SearchSong</h3>
      <input type="text" value={song} onChange={(e) => setSong(e.target.value)} className="w-[20rem] h-[2rem]" />
      <div></div>
    </div>
  );
};

export default SearchSong;
