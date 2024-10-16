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

  if (isTrackLoading || isRecommendedLoading) {
    return <div className="m-4 text-center">정보를 불러오는 중입니다.</div>;
  }

  if (isTrackError || isRecommendedError) {
    return <div className="m-4 text-center">정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="min-h-screen wrap mx-auto mt-32 ">
      <div>
        {track && <TrackCard track={track} showPopularity={true} isDetailPage={true} />}
        <hr className="mt-20 mb-8 border-t border-custom-blue" />
        <div className="mt-10">
          <h3 className=" text-3xl font-semibold">추천</h3>
          <p className="text-lg font-medium text-gray-400">이 곡 기준</p>
          <ul className="flex mt-5 gap-4">
            {recommendedTracks?.map((recommendedTrack) => (
              <li key={recommendedTrack.id} className="flex-1">
                <TrackCard track={recommendedTrack} isRecommended={true} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
