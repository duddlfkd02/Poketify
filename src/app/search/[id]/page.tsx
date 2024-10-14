"use client";

import { getTrackById, getRecommendedTracks } from "@/lib/spotifyToken";
import { SearchTrack } from "@/types/search";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TrackCard from "@/components/TrackCard";

export default function SearchTrackDetail() {
  const { id } = useParams();
  const [track, setTrack] = useState<SearchTrack | null>(null);
  const [recommendedTracks, setRecommendedTracks] = useState<SearchTrack[]>([]);

  useEffect(() => {
    const fetchTrack = async () => {
      if (typeof id === "string") {
        try {
          const trackDetail = await getTrackById(id);
          setTrack(trackDetail);

          const recommendTracks = await getRecommendedTracks(id);
          setRecommendedTracks(recommendTracks);
        } catch (error) {
          console.log("곡 상세정보를 불러오던 중 오류 발생", error);
        }
      }
    };
    fetchTrack();
  }, [id]);

  if (!track) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>곡 상세 정보</h1>
      <TrackCard track={track} showPopularity={true} />

      <div style={{ marginTop: "20px" }}>
        <h3>추천 곡</h3>
        <ul className="flex justify-center items-center gap-5">
          {recommendedTracks.map((recommendedTrack) => (
            <li key={recommendedTrack.id} className="max-w-40 flex justify-center items-center">
              <TrackCard track={recommendedTrack} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
