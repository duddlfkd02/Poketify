import SpotifyPlaylist from "@/components/spotifyPlayList";

export default function MainPage() {
  return (
    <div className="container mx-auto p-5">
      <h1 className=" text-2xl font-bold mb-5">홈</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">인기 앨범</h2>
      </section>
      <SpotifyPlaylist />
    </div>
  );
}
