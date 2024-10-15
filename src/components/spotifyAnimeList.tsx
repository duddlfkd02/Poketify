"use client";

import { useEffect, useState } from "react";
import { getAccessToken, getSpotifyAnimelist } from "@/lib/spotifyToken";
import { SpotifyAnimelistTrack } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function SpotifyAnimelist() {
  const [tracks, setTracks] = useState<SpotifyAnimelistTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5; // 한 번에 보여줄 항목 수
  if (tracks.length) {
    console.log("track=>", tracks.slice(80, 85));
  }

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const token = await getAccessToken();
        const playlistData = await getSpotifyAnimelist(token as string);
        console.log("Fetched Spotify Data:", playlistData);
        setTracks(playlistData.items); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching Spotify animation list:", error);
      }
    };

    fetchSpotifyData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const number = Math.min(prevIndex + itemsPerPage, tracks.length - itemsPerPage);
      console.log("number=>", number);
      return number;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <div className="relative mb-8">
      <div className="grid grid-cols-5 gap-4">
        {/* 80 + 5 =85 84번 트랙까지 있, 85가 없음 */}
        {tracks.slice(currentIndex, currentIndex + itemsPerPage).map((item) => (
          <div key={crypto.randomUUID()}>
            {/* item.track이 있을 때만 렌더링  */}
            {item.track && (
              <div key={item.track.id} className="flex flex-col relative h-64">
                <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.track.album?.images?.[0]?.url || "/default-image.jpg"} // album과 images가 존재하는지 확인
                    alt={item.track.name}
                    className="rounded w-full h-auto"
                  />
                  <p className="mt-5 text-left">{item.track.name}</p>
                  <p className="text-left text-sm text-gray-400 mt-1">
                    {item.track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 왼쪽 버튼 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition duration-300 scale-125 hover:scale-150"
        >
          <ChevronLeft strokeWidth={0.2} size={40} />
        </button>
      )}

      {/* 오른쪽 버튼 */}
      {currentIndex + itemsPerPage < tracks.length && (
        <button
          onClick={handleNext}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition duration-300 scale-125 hover:scale-150"
        >
          <ChevronRight strokeWidth={0.2} size={40} />
        </button>
      )}
    </div>
  );
}
