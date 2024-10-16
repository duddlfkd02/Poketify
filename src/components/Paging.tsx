"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const pagingCount: number = 5; // 한 번에 보여 줄 페이징 개수

type Props = {
  nowPage: number;
  totalCount: number;
};

const Paging = ({ nowPage, totalCount }: Props) => {
  const router = useRouter();
  const [pageOfPaging, setPageOfPaging] = useState<number>(Math.floor((nowPage - 1) / pagingCount + 1)); // 페이징의 페이지..?

  // 페이징 생성하기
  const makePaging = (num: number) => {
    const page: React.ReactNode[] = [];

    const pagingLength = pagingCount * num;

    const startPage = 1 + pagingCount * (num - 1); // 페이징 시작 번호
    const lastPage = pagingLength > totalCount ? totalCount : pagingLength; // 페이징 마지막 번호

    for (let i = startPage; i <= lastPage; i++) {
      page.push(
        <Link
          key={"page" + i}
          href={`/community/list?page=${i}`}
          className={`mx-1 px-3 py-1 cursor-pointer ${
            nowPage === i ? "text-custom-blue font-semibold" : "text-gray-500 hover:text-custom-blue"
          } transition-all duration-300 ease-in-out`}
        >
          {i}
        </Link>
      );
    }
    return page;
  };

  // 페이징 이전 버튼 클릭 시
  const handleClickPrev = () => {
    if (nowPage === 1) return false;

    if (nowPage % pagingCount === 1) {
      setPageOfPaging(pageOfPaging - 1);
    }

    router.push(`/community/list?page=${nowPage - 1}`);
  };

  // 페이징 다음 버튼 클릭 시
  const handleClickNext = () => {
    if (nowPage === totalCount) return false;

    if (nowPage === pagingCount * pageOfPaging) {
      setPageOfPaging(pageOfPaging + 1);
    }

    router.push(`/community/list?page=${nowPage + 1}`);
  };

  return (
    <>
      <div className="prev cursor-pointer" onClick={handleClickPrev}>
        <ChevronLeft strokeWidth={1} size={30} className="text-gray-500 hover:text-custom-blue my-2 text-2xl" />
      </div>
      {makePaging(pageOfPaging)}
      <div className="next cursor-pointer" onClick={handleClickNext}>
        <ChevronRight strokeWidth={1} size={30} className="text-gray-500 hover:text-custom-blue my-2 text-2xl" />
      </div>
    </>
  );
};
export default Paging;
