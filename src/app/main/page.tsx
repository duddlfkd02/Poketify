import SpotifyNewlist from "@/components/SpotifyNewList";
import FeaturedPlaylists from "@/components/FeaturedPlaylists";
import SpotifyAnimelist from "@/components/SpotifyAnimeList";

export default function MainPage() {
  return (
    <div className="wrap  ">
      <h1 className="text-left text-2xl md:text-3xl lg:text-5xl font-bold mb-5">홈</h1>
      <hr className="mt-3 mb-8 border-t border-custom-blue" />
      {/* 최신 발매 */}
      <section className="mb-3">
        <SpotifyNewlist />
      </section>

      {/* 애니메이션 앨범 */}
      <section className="mt-24 md:mt-20">
        <SpotifyAnimelist />
      </section>

      {/* 추천 플레이리스트 */}
      <section className="mt-24 md:mt-20 mb-28">
        <FeaturedPlaylists />
      </section>
    </div>
  );
}
