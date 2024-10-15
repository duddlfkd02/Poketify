"use client";

import { SearchTrack } from "@/types/search";
import { useSearchData } from "@/hooks/useSearchData";
import TrackCard from "@/components/TrackCard";
import Pagination from "@/components/Pagination";
import SkeletonList from "@/components/skeleton/SkeletonList";

export default function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = Array.isArray(searchParams?.query) ? searchParams.query[0] : searchParams?.query || "";
  const pageQuery = searchParams?.page ? Number(searchParams.page) : 1;

  const { results, totalPages, currentPage, setCurrentPage, fetchData, isLoading } = useSearchData(query, pageQuery);

  // 페이지 이동 함수
  const movePage = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());
    fetchData(page);
  };

  return (
    <div className="min-h-screen wrap mx-auto mt-32 ">
      <div className="flex flex-col justify-center">
        <h1 className="text-left text-black text-5xl font-bold mb-5">검색 결과</h1>
        <hr className="mb-8 border-t border-custom-blue" />

        {isLoading ? (
          <SkeletonList count={10} />
        ) : (
          <div className="flex flex-wrap">
            {results.map((track: SearchTrack) => (
              <div
                key={track.id}
                className="w-full sm:w-1/3 p-2" // 작은 화면에서는 1열, 큰 화면에서는 2열
              >
                <div className="p-4">
                  <TrackCard track={track} />
                </div>
                {/* <hr className="mb-4 border-t border-custom-blue" /> */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto w-full max-w-3xl flex justify-center mt-20 mb-20">
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={10} movePage={movePage} />
      </div>
    </div>
  );
}
