"use client";

import MyPlaylist from "@/components/MyPlaylist";
import RecommendPlaylist from "@/components/RecommendPlaylist";
import SearchSong from "@/components/SearchSong";
import SongList from "@/components/SongList";
import { useState } from "react";

const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // 플레이리스트 선택 핸들러
  const onPlaylistSelect = (id: string | null) => {
    console.log("Selected Playlist ID:", id);
    setSelectedPlaylist(id);
  };

  return (
    <main className="w-full h-screen mx-auto flex flex-col justify-center items-center mt-8">
      <section className="w-[95%] mx-auto flex">
        <article className="w-[30%] bg-white p-7 flex-grow min-h-[700px]">
          <SongList playlistId={selectedPlaylist} />
        </article>
        <article className="w-[70%] min-h-[80vh] bg-white p-7 flex flex-col justify-between flex-grow gap-3">
          <div className="flex-1">
            <SearchSong />
          </div>
          <div className="flex-1">
            <MyPlaylist onPlaylistSelect={onPlaylistSelect} />
          </div>
          <div className="flex-1">
            <RecommendPlaylist onPlaylistSelect={onPlaylistSelect} />
          </div>
        </article>
      </section>
    </main>
  );
};

export default PlaylistPage;
