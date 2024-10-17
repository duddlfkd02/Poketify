"use client";

import MyPlaylist from "@/components/MyPlaylist";
import RecommendPlaylist from "@/components/RecommendPlaylist";
import SelectedPlaylist from "@/components/SelectedPlaylist";
import SongList from "@/components/SongList";
import { useState } from "react";

const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // 플레이리스트 선택 핸들러
  const onPlaylistSelect = (id: string | null) => {
    setSelectedPlaylist(id);
  };

  return (
    <main className="wrap">
      <section className="flex flex-col md:flex-row gap-16 md:gap-16">
        <article className="flex flex-col flex-shrink-0 md:w-5/12">
          <SelectedPlaylist playlistId={selectedPlaylist} />

          <SongList playlistId={selectedPlaylist} />
        </article>

        <article className="flex-1 flex flex-col gap-14 md:gap-9">
          <MyPlaylist onPlaylistSelect={onPlaylistSelect} />

          <RecommendPlaylist onPlaylistSelect={onPlaylistSelect} />
        </article>
      </section>
    </main>
  );
};

export default PlaylistPage;
