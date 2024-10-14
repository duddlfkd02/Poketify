"use client";

import { SearchTrack } from "@/types/search";
import { useSearchData } from "@/hooks/useSearchData";
import TrackCard from "@/components/TrackCard";
import Pagination from "@/components/Pagination";

export default function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = Array.isArray(searchParams?.query) ? searchParams.query[0] : searchParams?.query || "";
  const pageQuery = searchParams?.page ? Number(searchParams.page) : 1;

  const { results, totalPages, currentPage, setCurrentPage, fetchData } = useSearchData(query, pageQuery);

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
            <TrackCard track={track} />
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={10} movePage={movePage} />
      </div>
    </div>
  );
}
