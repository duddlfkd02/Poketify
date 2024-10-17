import { SearchTrack } from "@/types/search";
import Link from "next/link";
import Image from "next/image";
import { IoPlayCircleSharp } from "react-icons/io5";

type TrackCardProps = {
  track: SearchTrack;
  showPopularity?: boolean;
  isDetailPage?: boolean;
  isRecommended?: boolean;
};

export default function TrackCard({
  track,
  // showPopularity = false,
  isDetailPage = false,
  isRecommended = false
}: TrackCardProps) {
  return (
    <div className={`${isDetailPage ? "flex items-end" : ""}`}>
      <Link
        href={`/search/${track.id}`}
        className={`flex ${
          isRecommended
            ? "flex-col w-full items-left gap-0"
            : `${
                isDetailPage ? "gap-6 flex-col w-full md:w-auto md:flex-row md:gap-8 lg:gap-10 items-end" : "gap-5 pr-4"
              }`
        }`}
      >
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={600}
          height={600}
          className={`${
            isRecommended
              ? "rounded w-full h-auto"
              : `${isDetailPage ? " flex-shrink-0 w-full md:w-80 rounded h-fit" : "w-24 rounded h-fit"}`
          }`}
        />

        <div
          className={`flex ${
            isRecommended ? "flex-col text-left" : `${isDetailPage ? "items-end gap-4 w-full" : "flex-col"}`
          }`}
        >
          <div className="flex flex-col">
            <p
              className={`${
                isRecommended
                  ? "mt-4 line-clamp-2 md:line-clamp-none text-base font-normal"
                  : `${
                      isDetailPage
                        ? "text-xl md:text-3xl lg:text-5xl !leading-tight font-semibold"
                        : "line-clamp-2 text-base md:text-lg lg:text-xl font-semibold"
                    }`
              }`}
            >
              {track.name}
            </p>
            <p
              className={`${
                isRecommended
                  ? "mb-1 line-clamp-1 md:line-clamp-none text-sm text-gray-400"
                  : `${
                      isDetailPage
                        ? "mt-4  text-lg md:text-xl lg:text-3xl font-semibold text-gray-400"
                        : "text-base text-gray-400"
                    }`
              }`}
            >
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p
              className={`${
                isDetailPage
                  ? "mt-2 text-base md:text-lg lg:text-2xl font-medium text-gray-300"
                  : "text-xs text-gray-400"
              }`}
            >
              {track.album.release_date}
            </p>
          </div>
          {/* 상세 페이지일 때만 스포티파이 링크 표시 */}
          {isDetailPage && (
            <div
              onClick={() => window.open(track.external_urls.spotify, "_blank")}
              rel="noopener noreferrer"
              className=" text-custom-blue ml-auto"
            >
              <IoPlayCircleSharp size={120} className="h-auto w-16 md:w-20 lg:w-[120px]" />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
