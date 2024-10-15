"use client";

import Link from "next/link";
import { CommunityGetPlaylist } from "./CommunityGetPlaylist";
import { FormType } from "@/types/FormType";
import { getAccessToken } from "@/lib/spotifyToken";
import { useEffect, useState } from "react";

type Props = {
  post: FormType;
};

const CommunityListCard = ({ post }: Props) => {
  const [imgUrl, setImgUrl] = useState<string>("");

  const getPlaylist = async () => {
    const token = await getAccessToken();
    const playlist = await CommunityGetPlaylist(post.playlist_id, token!);

    if (!playlist.ok) return setImgUrl("https://placehold.co/200?text=No+Playlist&font=roboto");
    const playlistInfo = await playlist.json();

    setImgUrl(playlistInfo.images[0].url);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return <Card post={post} imgUrl={imgUrl} />;
};
export default CommunityListCard;

type CardProps = {
  post: FormType;
  imgUrl: string;
};

export const Card = ({ post, imgUrl }: CardProps) => {
  return (
    <Link
      href={`/community/detail/${post.id}`}
      className="flex flex-col gap-3 items-center w-[calc(50%-8px)] sm:w-[calc(25%-12px)] md:w-[calc(20%-12.8px)]"
    >
      <img src={imgUrl} alt="album_cover" className="w-full" />
      {post.title}
    </Link>
  );
};
