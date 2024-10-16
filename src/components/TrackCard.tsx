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
        className={`flex ${isRecommended ? "flex-col w-full items-left gap-0" : `${isDetailPage ? "gap-16 items-end" : "gap-5"}`}`}
      >
        <Image
          src={track.album.images[0].url}
          alt={track.name}
          width={600}
          height={600}
          className={`${isRecommended ? "rounded w-full h-auto" : `${isDetailPage ? " flex-shrink-0 w-80 rounded h-fit" : "w-24 rounded h-fit"}`}`}
        />

        <div className={`flex ${isRecommended ? "flex-col text-left" : "flex-col"} ${isDetailPage ? "mt-36 " : ""}`}>
          <p
            className={`${isRecommended ? "mt-4 text-base font-normal" : `${isDetailPage ? "text-8xl font-semibold" : "line-clamp-2 text-xl font-semibold"}`}`}
          >
            {track.name}
          </p>
          <p
            className={`${isRecommended ? " text-sm text-gray-400" : `${isDetailPage ? "mt-4 text-3xl font-semibold text-gray-400" : "text-base text-gray-400"}`}`}
          >
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p className={`${isDetailPage ? "text-3xl font-medium text-gray-300" : "text-xs text-gray-400"}`}>
            {track.album.release_date}
          </p>
          {/* {showPopularity && <p className="text-sm">선호도: {track.popularity} / 100</p>} */}
        </div>
      </Link>

      {/* 상세 페이지일 때만 스포티파이 링크 표시 */}
      {isDetailPage && (
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-custom-blue ml-auto"
        >
          <IoPlayCircleSharp size={120} />
        </a>
      )}
    </div>
  );
}
