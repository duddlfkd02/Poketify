"use client";

import { SearchTrack } from "@/types/search"; // 타입스크립트
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchTracks } from "@/lib/spotifyToken"; // 토큰

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<SearchTrack[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const pageRange = 10;

  // 전체 데이터 수 페이지네이션 생성
  const fetchTotalPages = async (): Promise<void> => {
    try {
      const response = await searchTracks(query, 0, limit);
      const { total } = response.tracks;
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("전체 데이터 가져오기 실패:", error);
    }
  };

  // 해당 페이지의 데이터만 가져오기
  const fetchData = async (page: number): Promise<void> => {
    const offset = (page - 1) * limit;
    try {
      const response = await searchTracks(query, offset, limit);
      const { items } = response.tracks;
      setResults(items);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  // 검색어가 바뀌면 실행
  useEffect(() => {
    if (query) {
      setResults([]);
      setCurrentPage(1);
      fetchTotalPages();
      fetchData(1);
    }
  }, [query]);

  // 페이지 이동 함수
  const movePage = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => movePage(Math.max(1, currentPage - pageRange))}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          이전
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => movePage(Math.min(totalPages, currentPage + pageRange))}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          다음
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
