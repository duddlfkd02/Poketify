import { SearchTrack } from "@/types/search"; // 타입스크립트
import { searchTracks } from "@/lib/spotifyToken"; // 토큰
import { useEffect, useState } from "react";

export const useSearchData = (query: string, pageQuery: number, limit = 20) => {
  const [results, setResults] = useState<SearchTrack[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

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

  return { results, totalPages, currentPage, setCurrentPage, fetchData };
};
