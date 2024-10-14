"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
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

    if (pathname === "/search") {
      router.push(`/search?query=${query}`);
    } else {
      router.push(`/search?query=${query}`);
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
