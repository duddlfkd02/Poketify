import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

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
          className=" transition-all duration-300 ease-in-out"
        >
          <IoIosArrowDropleftCircle className="text-gray-500 hover:text-custom-blue mb-1 text-2xl" />
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => movePage(i)}
          className={`mx-1 px-3 py-1 cursor-pointer ${
            i === currentPage ? "text-custom-blue font-semibold" : "text-gray-500 hover:text-custom-blue"
          } transition-all duration-300 ease-in-out`}
        >
          {i}
        </span>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button
          key="next"
          onClick={() => movePage(Math.min(totalPages, currentPage + pageRange))}
          className="mt-2 transition-all duration-300 ease-in-out"
        >
          <IoIosArrowDroprightCircle className="text-gray-500 hover:text-custom-blue mb-2 text-2xl" />
        </button>
      );
    }

    return pageNumbers;
  };

  return <div className="flex justify-center items-center">{renderPageNumbers()}</div>;
}
