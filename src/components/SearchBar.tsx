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
    <div>
      <form onSubmit={handleSearch}>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="곡 이름이나 아티스트를 검색하세요"
            className="w-96 py-2 px-4 text-sm border-solid border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-custom-blue transition duration-300"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 "
            onClick={handleFocus} // 포커스 핸들러
          >
            <Search strokeWidth={2} size={20} className="text-custom-blue " />
          </button>
        </div>
      </form>
    </div>
  );
}
