"use client";

import { FilteredUser } from "../lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware"


type Store = {
  authUser: FilteredUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  requestLoading: boolean;
  setIsAdmin: (setAdming:boolean)=> void;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
  setAuthUser: (user: FilteredUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create(persist((set) => ({
  authUser: null,
  isLoggedIn: false,
  requestLoading: false,
  isAdmin: false,
  setIsAdmin: (adminCheck:boolean)=> set((state:any) => ({ ...state, isAdmin: adminCheck })),
  setLoggedIn: () => set((state:any) => ({ ...state, isLoggedIn: true })),
  setLoggedOut: () => set((state:any) => ({ ...state, isLoggedIn: false })),
  setAuthUser: (user:any) => set((state:any) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading:boolean) =>
    set((state:any) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
}),
  {
    name: "user-storage",
  }
));

export default useStore;
