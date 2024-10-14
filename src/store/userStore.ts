import { create } from "zustand";

interface User {
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const useUserStore = create<User>((set) => ({
  userId: null,
  setUserId: (id: string | null) => set({ userId: id })
}));

export default useUserStore;
