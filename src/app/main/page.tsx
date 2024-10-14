import SpotifyNewlist from "@/components/spotifyNewList";
import FeaturedPlaylists from "@/components/featuredPlaylists";

export default function MainPage() {
  return (
    <div className="min-h-screen container mx-auto mt-24 ">
      <h1 className="text-5xl font-bold mb-5">홈</h1>

      {/* 최신 앨범 */}
      <section className="mb-3">
        <h2 className="text-xl font-semibold mb-2">최신 앨범</h2>
        <SpotifyNewlist />
      </section>

      {/* 추천 플레이리스트 */}
      <section className="mt-28">
        <h2 className="text-xl font-semibold mb-2">플레이리스트 추천</h2>
        <FeaturedPlaylists />
      </section>
    </div>
  );
}
