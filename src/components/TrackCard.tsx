import { SearchTrack } from "@/types/search";
import Link from "next/link";
import Image from "next/image";

type TrackCardProps = {
  track: SearchTrack;
  showPopularity?: boolean;
};

export default function TrackCard({ track, showPopularity = false }: TrackCardProps) {
  return (
    <div>
      <Link href={`/search/${track.id}`}>
        <Image src={track.album.images[0].url} alt={track.name} width={100} height={100} />
        <p>곡 제목: {track.name}</p>
        <p>아티스트: {track.artists.map((artist) => artist.name).join(", ")}</p>
        <p>발매일: {track.album.release_date}</p>
        {showPopularity && <p>인기도: {track.popularity}</p>}
      </Link>
    </div>
  );
}
