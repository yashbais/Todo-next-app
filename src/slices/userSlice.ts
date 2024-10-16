import { StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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

export const userSlice  = persist(createUserSlice, {
    name: 'user-storage', 
    storage: createJSONStorage(() => sessionStorage), 
  });
