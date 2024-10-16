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
  currentPosition: 0,
  setTrackUri: (uri) => set({ trackUri: uri }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPosition: (position) => set({ currentPosition: position })
}));
