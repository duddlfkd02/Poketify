"use client";

import { useEffect, useState } from "react";
import { getFeaturedPlaylists } from "@/lib/spotifyToken";
import { FeaturedPlaylistsResponse, SpotifyFeatured } from "@/types/spotify";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function FeaturedPlaylists() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyFeatured[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // 한 번에 보여줄 항목 수

  // 데이터 Fetching
  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const featuredData: FeaturedPlaylistsResponse = await getFeaturedPlaylists();

        setFeaturedPlaylists(featuredData.playlists.items); // 가져온 데이터 상태에 저장
      } catch (error) {
        console.error("Error fetching featured playlists:", error);
      }
    };

    fetchSpotifyData();
  }, []);

  // 다음 페이지로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, featuredPlaylists.length - itemsPerPage));
  };

  // 이전 페이지로 이동
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <div className="group relative mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold mr-auto">플레이리스트 추천</h2>

        <div className="flex w-14 md:w-20">
          {/* 왼쪽 버튼 */}
          {currentIndex > 0 && (
            <button onClick={handlePrev} className="left_button">
              <ChevronLeft strokeWidth={1} size={40} color={"#0079FF"} className="w-7 h-7 md:w-10 md:h-10" />
            </button>
          )}

          {/* 오른쪽 버튼 */}
          {currentIndex + itemsPerPage < featuredPlaylists.length && (
            <button onClick={handleNext} className="right_button">
              <ChevronRight strokeWidth={1} size={40} color={"#0079FF"} className="w-7 h-7 md:w-10 md:h-10" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featuredPlaylists.slice(currentIndex, currentIndex + itemsPerPage).map((playlist) => (
          <div key={playlist.id} className="flex flex-col">
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <img
                src={playlist.images[0]?.url || "/default-image.jpg"} // 이미지가 없을 경우 기본 이미지 사용
                alt={playlist.name}
                width={600}
                height={600}
                className="rounded w-full h-auto"
              />
              <p className="mt-5 text-left">{playlist.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
