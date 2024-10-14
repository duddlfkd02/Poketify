import DetailLayout from "@/components/DetailLayout";
import { getAccessToken } from "@/lib/spotifyToken";
import browserClient from "@/supabase/client";
import { FormType } from "@/types/FormType";
import { Song } from "@/types/TrackType";

type Props = {
  params: {
    id: string;
  };
};
export function generateMetadata({ params }: Props) {
  return {
    title: `POST ID : ${params.id}`
  };
}

const Detail = async ({ params }: { params: { id: string } }) => {
  const { data } = await browserClient.from("posts").select().eq("id", params.id);
  const postData: FormType = data![0];

  const token = await getAccessToken();

  const playlist = await fetch(`https://api.spotify.com/v1/playlists/${postData.playlist_id}?market=KR`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!playlist.ok) return <DetailLayout postData={postData} />;

  const playlistInfo = await playlist.json();
  const playlistItem = playlistInfo.tracks.items;

  return (
    <DetailLayout postData={postData}>
      <>
        <div className="playlist_info">
          <div className="thumbnail">
            <img src={playlistInfo.images[0].url} alt="" className="w-16 h-16" />
          </div>

          <div className="playlist_title">{playlistInfo.name}</div>
          <div className="playlist_description">{playlistInfo.description}</div>
        </div>

        <ul className="overflow-y-auto max-h-96">
          {playlistItem.map((song: Song, idx: number) => {
            return (
              <li key={song.track.id} className="flex items-center">
                <div className="no">{idx + 1}</div>
                <div className="album">
                  <img src={song.track.album.images[0].url} alt="" className="w-16 h-16" />
                </div>
                <div className="info flex flex-col">
                  <div className="title">{song.track.name}</div>
                  <div className="artist">{song.track.artists[0].name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    </DetailLayout>
  );
};

export default Detail;
