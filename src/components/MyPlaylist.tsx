import { fetchPlaylist } from "@/utils/playlistApi";
import { useQuery } from "@tanstack/react-query";
import PlaylistCard from "./PlaylistCard";
import useUserStore from "@/store/userStore";
import { PlaylistResponse, Playlists } from "@/types/playlist";

interface MyPlaylistProps {
  onPlaylistSelect: (id: string) => void;
}

const MyPlaylist = ({ onPlaylistSelect }: MyPlaylistProps) => {
  // 유저 정보 불러오기
  const { userId } = useUserStore((state) => state);

  // 내 플레이리스트 불러오기
  const {
    data: myplaylist,
    isLoading,
    error
  } = useQuery({
    queryKey: ["myPlaylist"],
    queryFn: () => fetchPlaylist()
  });

  if (isLoading) {
    return <div>Loading...</div>; // 스피너 추가
  }

  if (error) {
    return <div>플레이리스트를 불러오는 데 실패했습니다. 다시 시도해 주세요.</div>;
  }

  if (!myplaylist || !Array.isArray(myplaylist.items)) {
    return <div>playlist가 없습니다</div>;
  }

  return (
    <div className="flex flex-col gap-8 pt-4 bg-blue-50 p-4 rounded">
      <h3 className="font-extrabold text-playlist-h3 text-left">내 플레이리스트</h3>
      <div>
        {myplaylist.items.map((playlist) => (
          <div key={playlist.id} onClick={() => onPlaylistSelect(playlist.id)}>
            <PlaylistCard playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylist;
