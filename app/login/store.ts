import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refresh: (accessToken: string, refreshToken: string) => void;
}

export const useLoginStore = create<State>()(
  persist(
    (set) => ({
      isLogged: false,
      accessToken: "",
      refreshToken: "",
      login: (accessToken: string, refreshToken: string) =>
        set({
          isLogged: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
      logout: () =>
        set({
          isLogged: false,
          accessToken: "",
          refreshToken: "",
        }),
      refresh: (accessToken: string, refreshToken: string) =>
        set({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
    }),
    {
      name: "NPS_ADMINAUTH",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
