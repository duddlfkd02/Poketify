"use client";

import { useEffect, useState } from "react";
import { getSpotifyNewlistItems } from "@/lib/spotifyToken";
import { SpotifyNewTrack } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function SpotifyNewlist() {
  const [tracks, setTracks] = useState<SpotifyNewTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5; // 한 번에 보여줄 항목 수

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const playlistData = await getSpotifyNewlistItems();
        setTracks(playlistData.items);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchSpotifyData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, tracks.length - itemsPerPage));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <div className="relative mb-8">
      <div className="grid grid-cols-5 gap-4">
        {tracks.slice(currentIndex, currentIndex + itemsPerPage).map((item) => (
          <div key={crypto.randomUUID()} className="flex flex-col relative h-64">
            <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img
                src={item.track.album.images[0].url}
                alt={item.track.name}
                className="rounded w-full h-auto cursor-pointer"
              />
              <p className="mt-5 text-left cursor-pointer">{item.track.name}</p>
              <p className="text-left text-sm text-gray-400 mt-1">
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </a>
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
