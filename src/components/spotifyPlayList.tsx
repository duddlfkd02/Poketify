"use client";

import { useEffect, useState } from "react";
import { getSpotifyToken, getSpotifyPlaylistItems } from "@/lib/spotify";
import { SpotifyTrack } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function SpotifyPlaylist() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const token = await getSpotifyToken();
        const playlistData = await getSpotifyPlaylistItems(token);
        setTracks(playlistData.items);
        console.log("get =>", playlistData);
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
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {tracks.slice(currentIndex, currentIndex + itemsPerPage).map((item) => (
          <div key={crypto.randomUUID()} className="flex flex-col relative h-64">
            <img src={item.track.album.images[0].url} alt={item.track.name} className="rounded w-full h-auto" />
            <p className="mt-5 text-left">{item.track.name}</p>
            <p className="text-left text-sm text-gray-400">
              {item.track.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* 이전 버튼 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition duration-300 scale-125 hover:scale-150"
        >
          <ChevronLeft strokeWidth={0.2} size={40} />
        </button>
      )}

      {/* 다음 버튼 */}
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
