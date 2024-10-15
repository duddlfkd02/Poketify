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
      <Link href={`/search/${track.id}`} className={`flex ${isRecommended ? "flex-col items-center" : "gap-6"}`}>
        <Image src={track.album.images[0].url} alt={track.name} width={150} height={150} className="rounded h-auto" />

        <div className={`flex ${isRecommended ? "flex-col text-center  mt-2" : "flex-col gap-2"}`}>
          <h3 className={`${isRecommended ? "text-lg leading-5 font-semibold" : "text-2xl font-semibold"}`}>
            {track.name}
          </h3>
          <p className="pt-2">{track.artists.map((artist) => artist.name).join(", ")}</p>
          <p className="text-sm">{track.album.release_date}</p>
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
