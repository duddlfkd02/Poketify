"use client";

import MyPlaylist from "@/components/MyPlaylist";
import RecommendPlaylist from "@/components/RecommendPlaylist";
import SearchSong from "@/components/SearchSong";
import SelectedPlaylist from "@/components/SelectedPlaylist";
import SongList from "@/components/SongList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // 플레이리스트 선택 핸들러
  const onPlaylistSelect = (id: string | null) => {
    setSelectedPlaylist(id);
  };

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("provider_token");

    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <main className="w-full md:h-screen mx-auto flex flex-col justify-center items-center mt-8">
      <section className="w-full md:w-[95%] mx-auto flex flex-col md:flex-row">
        <article className="w-full md:w-[30%] bg-white p-7 flex-grow min-h-[700px]">
          <SongList playlistId={selectedPlaylist} />
        </article>

        <article className="w-full md:w-[70%] min-h-[80vh] bg-white p-7 flex flex-col justify-between flex-grow gap-3">
          <div className="flex-1 flex gap-3">
            <div className="flex-1">
              <SearchSong playlistId={selectedPlaylist} />
            </div>
            <div className="flex-1">
              <SelectedPlaylist playlistId={selectedPlaylist} />
            </div>
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
