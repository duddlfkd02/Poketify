import { SearchTrack } from "@/types/search";
import Link from "next/link";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";

type TrackCardProps = {
  track: SearchTrack;
  showPopularity?: boolean;
  isDetailPage?: boolean;
  isRecommended?: boolean;
};

export default function TrackCard({
  track,
  showPopularity = false,
  isDetailPage = false,
  isRecommended = false
}: TrackCardProps) {
  return (
    <div
      className={`flex ${isRecommended ? "flex-col items-start" : "gap-6"} ${
        isDetailPage ? "bg-[#f0f0f0] p-6 rounded-lg" : ""
      }`}
    >
      <Link href={`/search/${track.id}`} className={`flex ${isRecommended ? "flex-col items-center" : "gap-5"}`}>
        <Image src={track.album.images[0].url} alt={track.name} width={100} height={100} className="rounded h-fit" />

        <div className={`flex ${isRecommended ? "flex-col text-center mt-2" : "flex-col"}`}>
          <h3 className={`${isRecommended ? "text-lg leading-5 font-semibold" : "line-clamp-2 text-xl font-semibold"}`}>
            {track.name}
          </h3>
          <p
            className="text-base text-gray-400
          "
          >
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
          <p className="text-xs text-gray-400">{track.album.release_date}</p>
          {showPopularity && <p className="text-sm">선호도: {track.popularity} / 100</p>}
        </div>
      </Link>

      {/* 상세 페이지일 때만 스포티파이 링크 표시 */}
      {isDetailPage && (
        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className=" text-custom-blue">
          <FaSpotify size={30} />
        </a>
      )}
    </div>
  );
}
