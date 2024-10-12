"use client";

import Image from "next/image";
import { useState } from "react";

import { SearchTrack } from "@/types/search";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchTrack[]>([]);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const response = await fetch(`/api/search?query=${query}`);

    if (!response.ok) {
      throw new Error("API 요청 실패" + response.status);
    }

    const data = await response.json();
    setResults(data);
  };

  const handleMore = () => {
    router.push(`/search?query=${query}`);
    setResults([]);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="곡 이름이나 아티스트를 검색하세요"
        />
        <button type="submit">검색</button>
      </form>
      <div>
        {results.length > 0 && (
          <ul>
            {results.slice(0, 10).map((track: SearchTrack) => (
              <li key={track.id}>
                <Image src={track.album.images[0].url} alt={track.name} width={200} height={200} />
                <p>곡 제목: {track.name}</p>
                <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
                <p>인기도: {track.popularity}</p>
              </li>
            ))}
          </ul>
        )}

        {results.length > 10 && <button onClick={handleMore}>더보기</button>}
      </div>
    </div>
  );
}
