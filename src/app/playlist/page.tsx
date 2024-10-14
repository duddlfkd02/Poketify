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
    <main className="w-full h-screen mx-auto flex flex-col justify-center items-center ">
      <section className="w-[95%] h-[90%] mx-auto flex gap-8">
        <article className="w-[30%] h-full bg-white p-7 flex-grow">
          <SongList />
        </article>
        <article className="w-[70%] h-full bg-white p-7 flex flex-col justify-between flex-grow">
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
