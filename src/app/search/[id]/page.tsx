"use client";

import { getTrackById, getRecommendedTracks } from "@/lib/spotifyToken";
import { SearchTrack } from "@/types/search";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      <Image src={track.album.images[0].url} alt={track.name} width={300} height={300} />
      <h2>{track.name}</h2>
      <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
      <p>발매일: {track.album.release_date}</p>
      <p>인기도: {track.popularity}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>추천 곡</h3>
        <ul className="flex justify-center items-center gap-5">
          {recommendedTracks.map((recommendedTrack) => (
            <li key={recommendedTrack.id} className="max-w-40 flex justify-center items-center">
              <Link href={`/search/${recommendedTrack.id}`}>
                <div style={{ cursor: "pointer" }}>
                  <Image
                    src={recommendedTrack.album.images[0].url}
                    alt={recommendedTrack.name}
                    width={100}
                    height={100}
                  />
                  <p>{recommendedTrack.name}</p>
                  <p>{recommendedTrack.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
