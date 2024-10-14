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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  const fetchData = async (page: number): Promise<void> => {
    const offset = (page - 1) * limit;
    try {
      const response = await searchTracks(query, offset, limit);
      const { items, total } = response.tracks;
      setResults(items);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    if (query) {
      setResults([]); // 초기화
      fetchData(1); // 첫 페이지 로드
    }
  }, [query]);

  const movePage = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => movePage(i)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: i === currentPage ? "#0079FF" : "#f0f0f0",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <h1>검색 결과 : {query}</h1>
      <ul>
        {results.map((track: SearchTrack) => (
          <li key={track.id}>
            <Image src={track.album.images[0].url} alt={track.name} width={100} height={100} />
            <p>곡 제목: {track.name}</p>
            <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
            <p>출시일: {track.album.release_date}</p>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>{renderPageNumbers()}</div>
    </div>
  );
}
