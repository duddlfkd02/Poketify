import { useTrackStore } from "@/store/useTrackStore";
import { pauseTrack, playTrack } from "@/utils/playlistApi";
import React, { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Playbar: React.FC = () => {
  const trackUri = useTrackStore((state) => state.trackUri);
  const isPlaying = useTrackStore((state) => state.isPlaying);
  const setIsPlaying = useTrackStore((state) => state.setIsPlaying);
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  // 트랙 재생 핸들러
  const handlePlay = async (): Promise<void> => {
    if (trackUri) {
      try {
        await playTrack(trackUri, currentPosition);
        setIsPlaying(true);
        console.log("트랙 재생 성공");
      } catch (error) {
        console.error("트랙 재생 실패:", error);
      }
    }
  };

  // 트랙 일시정지 핸들러
  const handlePause = async (): Promise<void> => {
    try {
      const position = await pauseTrack();
      setCurrentPosition(position);
      setIsPlaying(false);
    } catch (error) {
      console.error("트랙 일시정지 실패:", error);
    }
  };

  return (
    <div className="bg-pink-200 p-4 mx-auto flex gap-4 justify-center">
      {isPlaying ? (
        <button onClick={handlePause}>
          <FaPause />
        </button>
      ) : (
        <button onClick={handlePlay}>
          <FaPlay />
        </button>
      )}
    </div>
  );
};

export default Playbar;
