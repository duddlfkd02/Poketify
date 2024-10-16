import { create } from "zustand";

interface TrackStore {
  trackUri: string | null;
  setTrackUri: (uri: string) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentPosition: number;
  setCurrentPosition: (position: number) => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
  trackUri: null,
  isPlaying: false,
  currentPosition: 0, // 현재 위치 상태 추가
  setTrackUri: (uri) => set({ trackUri: uri }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPosition: (position) => set({ currentPosition: position }) // 위치 설정
}));
