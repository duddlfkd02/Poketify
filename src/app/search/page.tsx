"use client";

import { SearchTrack } from "@/types/search"; // 타입스크립트
import { searchTracks } from "@/lib/spotifyToken"; // 토큰
import { useEffect, useState } from "react";

import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = Array.isArray(searchParams?.query) ? searchParams.query[0] : searchParams?.query || "";
  const pageQuery = searchParams?.page ? Number(searchParams.page) : 1;

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

  // query 바뀌면 실행
  useEffect(() => {
    if (query) {
      setResults([]);
      setCurrentPage(pageQuery);
      fetchTotalPages();
      fetchData(pageQuery);
    }
  }, [query, pageQuery]);

  // 페이지 이동 함수
  const movePage = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());
    fetchData(page);
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

      <div style={{ marginTop: "20px" }}>
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={pageRange} movePage={movePage} />
      </div>
    </div>
  );
}
