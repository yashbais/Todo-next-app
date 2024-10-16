import { StateCreator } from "zustand";
import { User, UserSlice } from "../types/types";

const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (user) => {
    const currentUser = get().user;
    set({
      user: { ...currentUser, ...user } as User,
    });
  },
});

export const userSlice = createUserSlice;
