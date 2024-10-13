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
    <section className="w-[100%] h-[100vh] mx-auto  bg-primary flex justify-center items-center">
      <div className="w-[95%] h-[95vh] mx-auto flex justify-center items-center gap-8">
        <article className="w-[30%] h-[90%] bg-white">
          <SongList />
        </article>
        <article className="w-[70%] h-[90%] bg-white flex flex-col justify-between p-10">
          <div className="">
            <SearchSong />
          </div>
          <div>
            <MyPlaylist />
          </div>
          <div>
            <RecommendPlaylist />
          </div>
        </article>
      </div>
    </section>
  );
};

export default PlaylistPage;
