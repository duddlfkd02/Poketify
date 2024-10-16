"use client";

import { useEffect, useState } from "react";
import { getSpotifyAnimelist } from "@/lib/spotifyToken";
import { SpotifyAnimelistTrack } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function SpotifyAnimelist() {
  const [tracks, setTracks] = useState<SpotifyAnimelistTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; // 한 번에 보여줄 항목 수

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const playlistData = await getSpotifyAnimelist();
        console.log("Fetched Spotify Data:", playlistData);
        setTracks(playlistData.items.filter((item: SpotifyAnimelistTrack) => item.track !== null)); // 받아온 데이터를 상태에 저장
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
    <div className="group relative mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold mr-auto">애니메이션 발매</h2>

        <div className="flex w-14 md:w-20">
          {/* 왼쪽 버튼 */}
          {currentIndex > 0 && (
            <button onClick={handlePrev} className="left_button">
              <ChevronLeft strokeWidth={1} size={40} color={"#0079FF"} className="w-7 h-7 md:w-10 md:h-10" />
            </button>
          )}

          {/* 오른쪽 버튼 */}
          {currentIndex + itemsPerPage < tracks.length && (
            <button onClick={handleNext} className="right_button">
              <ChevronRight strokeWidth={1} size={40} color={"#0079FF"} className="w-7 h-7 md:w-10 md:h-10" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {/* 80 + 5 =85 84번 트랙까지 있, 85가 없음 */}
        {tracks.slice(currentIndex, currentIndex + itemsPerPage).map((item) => (
          <div key={item.track.id} className="flex flex-col relative">
            <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img
                src={item.track.album?.images?.[0]?.url || "/default-image.jpg"} // album과 images가 존재하는지 확인
                alt={item.track.name}
                className="rounded w-full h-auto"
              />
              <p className="mt-5 text-left line-clamp-2">{item.track.name}</p>
              <p className="text-left text-sm text-gray-400 mt-1 line-clamp-2">
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
