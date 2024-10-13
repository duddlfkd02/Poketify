"use client";

import { SearchTrack } from "@/types/search";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchTracks } from "@/lib/spotifyToken";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchTrack[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (currentOffset: number) => {
    try {
      const data = await searchTracks(query, currentOffset, 20);

      setResults((prevResults) => [...prevResults, ...data]);

      if (data.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  // query 바뀔 때마다 데이터를 초기화, 리로드
  useEffect(() => {
    setResults([]);
    setOffset(0);
    setHasMore(true);
    if (query) {
      fetchData(0);
    }
  }, [query]);

  // 데이터를 불러오는 함수
  const loadMore = () => {
    const newOffset = offset + 20;
    fetchData(newOffset);
    setOffset(newOffset);
  };

  return (
    <div>
      <h1>검색 결과 : {query}</h1>
      <ul>
        {results.map((track: SearchTrack) => (
          <li key={track.id}>
            <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
            <p>곡 제목: {track.name}</p>
            <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
            <p>출시일: {track.album.release_date}</p>
          </li>
        ))}
      </ul>
      {hasMore && <button onClick={loadMore}>더보기</button>}
    </div>
  );
}
