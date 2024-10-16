"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

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

    router.push(`/search?query=${query}`);

    setQuery("");
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative w-full max-w-md">
        <button
          type="submit"
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 "
          onClick={handleFocus} // 포커스 핸들러
        >
          <Search strokeWidth={2} size={20} className="h-auto text-custom-blue " />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="곡 이름이나 아티스트를 검색하세요"
          className="w-40 md:w-80 lg:w-96 py-2 px-4 pl-12 text-sm border-solid border border-custom-skyblue rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-custom-blue transition duration-300"
        />
      </div>
    </form>
  );
}
