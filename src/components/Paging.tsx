"use client";

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
        <Link key={"page" + i} href={`/community/list/${i}`} className={nowPage === i ? "nowPage" : undefined}>
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

    router.push(`/community/list/${nowPage - 1}`);
  };

  // 페이징 다음 버튼 클릭 시
  const handleClickNext = () => {
    if (nowPage === totalCount) return false;

    if (nowPage === pagingCount * pageOfPaging) {
      setPageOfPaging(pageOfPaging + 1);
    }

    router.push(`/community/list/${nowPage + 1}`);
  };

  return (
    <>
      <div className="prev" onClick={handleClickPrev}>
        이전 버튼
      </div>
      {makePaging(pageOfPaging)}
      <div className="next" onClick={handleClickNext}>
        다음 버튼
      </div>
    </>
  );
};
export default Paging;
