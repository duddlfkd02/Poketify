"use client";

import { useEffect, useState } from "react";
import { getSpotifyToken, getFeaturedPlaylists } from "@/lib/spotify";
import { FeaturedPlaylistsResponse, SpotifyFeatured } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function FeaturedPlaylists() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyFeatured[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // 한 번에 보여줄 항목 수

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const token = await getSpotifyToken();
        const featuredData: FeaturedPlaylistsResponse = await getFeaturedPlaylists(token);
        setFeaturedPlaylists(featuredData.playlists.items);
      } catch (error) {
        console.error("Error fetching featured playlists:", error);
      }
    };

    fetchSpotifyData();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, featuredPlaylists.length - itemsPerPage));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <div className="relative mb-8">
      <div className="grid grid-cols-4 gap-4">
        {featuredPlaylists.slice(currentIndex, currentIndex + itemsPerPage).map((playlist) => (
          <div key={playlist.id} className="flex flex-col">
            <img
              src={playlist.images[0]?.url || "/default-image.jpg"} // 이미지가 없을 경우 기본 이미지 사용
              alt={playlist.name}
              className="rounded w-full h-auto"
            />
            <p className="mt-5 text-left">{playlist.name}</p>
          </div>
        ))}
      </div>

      {/* 왼쪽 화살표 버튼 */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition duration-300 scale-125 hover:scale-150"
        >
          <ChevronLeft strokeWidth={0.2} size={40} />
        </button>
      )}

      {/* 오른쪽 화살표 버튼 */}
      {currentIndex + itemsPerPage < featuredPlaylists.length && (
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
