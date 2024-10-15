"use client";

import { getTrackById, getRecommendedTracks } from "@/lib/spotifyToken";
import { SearchTrack } from "@/types/search";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import TrackCard from "@/components/TrackCard";

export default function SearchTrackDetail() {
  const { id } = useParams();
  const {
    data: track,
    isLoading: isTrackLoading,
    isError: isTrackError
  } = useQuery<SearchTrack>({ queryKey: ["track", id], queryFn: () => getTrackById(id as string) });
  console.log(track);
  const {
    data: recommendedTracks,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError
  } = useQuery<SearchTrack[]>({
    queryKey: ["recommendedTrack", id],
    queryFn: () => getRecommendedTracks(id as string)
  });

  if (isTrackLoading) {
    return <div>로딩 중...</div>;
  }

  if (isTrackError) {
    return <div>곡 상세정보를 불러오지 못했습니다.</div>;
  }
  if (isRecommendedLoading) {
    return <div>로딩 중...</div>;
  }

  if (isRecommendedError) {
    return <div>추천정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="pt-36 pb-20 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-4xl mb-8 text-center font-semibold text-custom-blue">Now Your Pick!</h1>
        {track && <TrackCard track={track} showPopularity={true} isDetailPage={true} />}

        <div className="mt-10">
          <h3 className="mb-4 text-xl font-semibold">Recommand Albums</h3>
          <ul className="flex justify-center items-start gap-5">
            {recommendedTracks?.map((recommendedTrack) => (
              <li key={recommendedTrack.id} className="max-w-40 flex justify-center items-start">
                <TrackCard track={recommendedTrack} isRecommended={true} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
