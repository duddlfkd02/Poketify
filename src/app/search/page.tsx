"use client";

import { SearchTrack } from "@/types/search";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchTrack[]>([]);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      };

      fetchData();
    }
  }, [query]);

  return (
    <div>
      <h1>검색 결과 : {query}</h1>
      <ul>
        {results.map((track: SearchTrack) => (
          <li key={track.id}>
            <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
            <p>곡 제목: {track.name}</p>
            <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
            <p>인기도: {track.popularity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
