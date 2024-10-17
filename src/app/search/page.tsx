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
    <div className="min-h-screen wrap mx-auto mt12 md:mt-16 lg:mt-24 overflow-hidden">
      <div className="flex flex-col justify-center">
        <h1 className="text-left text-black text-2xl md:text-3xl lg:text-5xl font-bold mb-5">검색 결과</h1>
        <hr className="mb-8 border-t border-custom-blue" />

        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {results.map((track: SearchTrack) => (
            <div key={track.id} className="w-full  md:w-[calc(50%-8px)] lg:w-[calc(33.333%-32px/3)] ">
              <TrackCard track={track} />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl flex justify-center mt-20 mb-20">
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={5} movePage={movePage} />
      </div>
    </div>
  );
}
