"use client";

import { supabase } from "@/supabase/supabase";
import Link from "next/link";
import { convertTime } from "@/utils/convertTime";
import { CommunityGetPlaylist } from "./CommunityGetPlaylist";
import { FormType } from "@/types/FormType";
import { getAccessToken } from "@/lib/spotifyToken";
import { useEffect, useState } from "react";
import { Item, PlaylistType } from "@/types/PlaylistType";

type Props = {
  postId: string;
};

const DetailPlaylist = ({ postId }: Props) => {
  const [info, setInfo] = useState<PlaylistType>();
  const [item, setItem] = useState<Item[]>();

  const getPlaylist = async () => {
    const token = await getAccessToken();

    const { data } = await supabase.from("posts").select().eq("id", postId);
    const postData: FormType = data![0];

    const playlist = await CommunityGetPlaylist(postData.playlist_id, token);

    const playlistInfo = await playlist.json();
    setInfo(playlistInfo);
    const playlistItem = playlistInfo?.tracks.items;
    setItem(playlistItem);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <>
      <div className="playlist_info flex gap-4 items-center justify-center py-6">
        <div className="thumbnail flex-shrink-0 w-1/3 md:w-1/5">
          <img src={info?.images[0].url} alt={info?.name} className="w-full h-auto rounded" />
        </div>

        <div className="info flex flex-col gap-3">
          <div className="playlist_title text-2xl md:text-4xl font-bold">{info?.name}</div>
          <div className="playlist_description line-clamp-2 leading-tight md:line-clamp-none">{info?.description}</div>
        </div>
      </div>

      <ul className="flex flex-col gap-4 overflow-y-auto max-h-96 mb-20">
        {item?.map((song, idx) => {
          return (
            <li key={song.track.id} className="flex items-center">
              <div className="no flex items-center justify-center flex-shrink-0 w-12 h-8">{idx + 1}</div>

              <Link
                href={song.track.external_urls.spotify}
                target="_blank"
                className="relative flex flex-wrap rounded overflow-hidden md:rounded-none md:overflow-auto md:flex-nowrap flex-shrink-0 items-center gap-2 w-1/3"
              >
                <div className="album flex-shrink-0 w-full md:max-w-20">
                  <img src={song.track.album.images[0].url} alt="" className="w-full h-auto rounded" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full p-2 text-center flex flex-col items-center justify-center gap-2 text-sm bg-[rgba(0,0,0,0.4)] text-white md:relative md:w-fit md:h-auto md:items-start md:p-0 md:text-left md:bg-transparent md:text-black">
                  <div className="track text-lg leading-tight font-bold line-clamp-2">{song.track.name}</div>
                  <div className="artist">{song.track.artists[0].name}</div>
                </div>
              </Link>

              <Link href={`https://open.spotify.com/album/${song.track.album.id}`} target="_blank" className="mx-2">
                {song.track.album.name}
              </Link>

              <div className="playtime flex-shrink-0 flex justify-center w-16 ml-auto">
                {convertTime(song.track.duration_ms)}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default DetailPlaylist;
