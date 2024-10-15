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
    <div className="pt-36 pb-20 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl mb-8 text-center font-semibold text-custom-blue">Pick your Track!</h1>
        <ul>
          {results.map((track: SearchTrack) => (
            <li
              key={track.id}
              className="p-4 mb-6 rounded-lg hover:bg-[#fdfdfd] hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <TrackCard track={track} />
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 w-full max-w-3xl flex justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} pageRange={10} movePage={movePage} />
      </div>
    </div>
  );
}
