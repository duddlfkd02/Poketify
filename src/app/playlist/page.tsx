"use client";

import MyPlaylist from "@/components/MyPlaylist";
import RecommendPlaylist from "@/components/RecommendPlaylist";
import SearchSong from "@/components/SearchSong";
import SongList from "@/components/SongList";
import { recommandPlaylist } from "@/utils/playlistApi";
import { useEffect } from "react";

const PlaylistPage = () => {
  useEffect(() => {
    recommandPlaylist();
  }, []);
  return (
    <main className="w-[100%] h-[100vh] mx-auto  bg-primary flex justify-center items-center">
      <section className="w-[95%] h-[95vh] mx-auto flex justify-center items-center gap-8">
        <article className="w-[30%] h-[95%] bg-white p-7 ">
          <SongList />
        </article>
        <article className="w-[70%] h-[95%] bg-white flex flex-col justify-between p-7">
          <div>
            <SearchSong />
          </div>
          <div>
            <MyPlaylist />
          </div>
          <div>
            <RecommendPlaylist />
          </div>
        </article>
      </section>
    </main>
  );
};

export default PlaylistPage;
