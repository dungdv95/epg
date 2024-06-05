import { Inbox } from "lucide-react";
import { SidebarItem } from "./menu";
import { create } from "zustand";

type State = {
  pageCurrent: SidebarItem;
};

type Actions = {
  setPageCurrent: (page: SidebarItem) => void;
  reset: () => void;
};

const initialState: State = {
  pageCurrent: {
    title: "Dashboard",
    icon: Inbox,
    variant: "ghost",
    url: "/system",
    name: "Dashboard",
    items: [],
  },
};

export const useStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setPageCurrent(page: SidebarItem) {
    set({ pageCurrent: page });
  },
  reset() {
    set(initialState);
  },
}));
