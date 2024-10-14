"use client";

import { SearchTrack } from "@/types/search";
import { useSearchData } from "@/hooks/useSearchData";
import Pagination from "@/components/Pagination";
import Image from "next/image";

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
            <Image src={track.album.images[0].url} alt={track.name} width={100} height={100} />
            <p>곡 제목: {track.name}</p>
            <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
            <p>출시일: {track.album.release_date}</p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={10} movePage={movePage} />
      </div>
    </div>
  );
}
