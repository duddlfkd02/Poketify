"use client";

import { CommunityGetPlaylist } from "@/components/CommunityGetPlaylist";
import DetailLayout from "@/components/DetailLayout";
import DetailPlaylist from "@/components/DetailPlaylist";
import { getAccessToken } from "@/lib/spotifyToken";
import browserClient from "@/supabase/client";
import { FormType } from "@/types/FormType";
import { useEffect, useState } from "react";

const initialData = {
  title: "",
  playlist_id: "",
  content: "",
  user_nickname: ""
};

const Detail = ({ params }: { params: { id: string } }) => {
  const [detailData, setDetailData] = useState<FormType>(initialData);
  const [hassPlaylist, setHasPlaylist] = useState<boolean>(false);

  useEffect(() => {
    const getDetail = async () => {
      const token = await getAccessToken();

      const { data } = await browserClient.from("posts").select().eq("id", params.id);
      const postData: FormType = data![0];
      setDetailData(postData);

      const playlist = await CommunityGetPlaylist(postData.playlist_id, token);

      setHasPlaylist(playlist.ok);
    };

    getDetail();
  }, []);

  return hassPlaylist ? (
    <DetailLayout postData={detailData}>
      <DetailPlaylist postId={params.id} />
    </DetailLayout>
  ) : (
    <DetailLayout postData={detailData} />
  );
};

export default Detail;
