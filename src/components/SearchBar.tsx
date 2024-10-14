"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchTrack, SearchTrackResponse } from "@/types/search";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchTrack[]>([]);
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 확인

  const handleFocus = () => {
    if (pathname !== "/search") {
      router.push("/search");
    }
  };

  const handleSearch = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!query.trim()) {
      alert("검색어를 입력해주세요");
      return;
    }

    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error("API 요청 실패" + response.status);
      }
      const data: SearchTrackResponse = await response.json();
      setResults(data.tracks.items);

      if (pathname === "/search") {
        router.push(`/search?query=${query}`);
      }
    } catch (error) {
      console.log("API 요청 중 오류 발생", error);
    }
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
        <button type="submit" onClick={handleFocus}>
          검색
        </button>
      </form>
    </div>
  );
}
