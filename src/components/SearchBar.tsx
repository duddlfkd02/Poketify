"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BsSearchHeart } from "react-icons/bs";

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

    setQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex justify-center align-middle gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="곡 이름이나 아티스트를 검색하세요"
          className="w-60 py-2 px-4 text-sm border-solid border-2 rounded-full focus:outline-custom-blue"
        />
        <button
          type="submit"
          onClick={handleFocus}
          className="rounded-full p-3 cursor-pointer text-primary hover:bg-custom-blue hover:text-white transition-all"
        >
          <BsSearchHeart size={20} />
        </button>
      </form>
    </div>
  );
}
