import SpotifyPlaylist from "@/components/spotifyPlayList";

export default function MainPage() {
  return (
    <div className="min-h-screen container mx-auto mt-24 ">
      <h1 className=" text-5xl font-bold mb-5">홈</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">인기 앨범</h2>
      </section>
      <SpotifyPlaylist />
    </div>
  );
}
