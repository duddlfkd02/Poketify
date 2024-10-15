import { CommunityGetPlaylist } from "@/components/CommunityGetPlaylist";
import DetailLayout from "@/components/DetailLayout";
import DetailPlaylist from "@/components/DetailPlaylist";
import { getAccessToken } from "@/lib/spotifyToken";
import browserClient from "@/supabase/client";
import { FormType } from "@/types/FormType";

const Detail = async ({ params }: { params: { id: string } }) => {
  const token = await getAccessToken();

  const { data } = await browserClient.from("posts").select().eq("id", params.id);
  const postData: FormType = data![0];

  const playlist = await CommunityGetPlaylist(postData.playlist_id, token);

  if (!playlist.ok) return <DetailLayout postData={postData} />;

  return (
    <DetailLayout postData={postData}>
      <DetailPlaylist postId={params.id} />
    </DetailLayout>
  );
};

export default Detail;
