type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pageRange: number;
  movePage: (page: number) => void;
};

export default function Pagination({ totalPages, currentPage, pageRange, movePage }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (currentPage > 1) {
      pageNumbers.push(
        <button
          key="prev"
          onClick={() => movePage(Math.max(1, currentPage - pageRange))}
          className="mx-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
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
          className={`mx-1 px-3 py-2 border border-gray-300 rounded ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
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
          className="mx-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
        >
          다음
        </button>
      );
    }

    return pageNumbers;
  };

  return <div>{renderPageNumbers()}</div>;
}
