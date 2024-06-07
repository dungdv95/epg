"use client";

import { useLoginStore } from "@/app/login/store";
// import { useLoginStore } from "@/app/sign-in/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import API from "@/configs/API";
// import API from "@/configs/API";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

interface State {
  open: boolean;
  code: string;
  message: string;
  setOpen: (open: boolean) => void;
  setCode: (code: string) => void;
  setMessage: (message: string) => void;
}

const useStore = create<State>((set: any) => ({
  open: false,
  code: "",
  message: "",
  setOpen(open: any) {
    set({ open });
  },
  setCode(code: string) {
    set({ code });
  },
  setMessage(message: string) {
    set({ message });
  },
}));

export function Notice(params: any) {
  if (params?.status == 401) {
    useStore.getState().setCode(params?.status);
    useStore.getState().setMessage(params?.message);
    useStore.getState().setOpen(true);
  }
}

export function useNotice() {
  const setOpenDialog = (params: any) => {
    useStore.getState().setCode(params?.code);
    useStore.getState().setMessage(params?.message);
    useStore.getState().setOpen(true);
  };

  return { setOpenDialog };
}

export function ErrorConfirm() {
  const logout = useLoginStore((a) => a.logout);
  //   const setUrlCurrent = useLoginStore((a) => a.setUrlCurrent);
  const { open, code, message, setOpen } = useStore();
  const router = useRouter();
  const { toast } = useToast();
  // useEffect(() => {
  //   if (message) {
  //     toast({
  //       title: "Error",
  //       description: message,
  //     });
  //   }
  // }, [message]);

  const handleLogout = () => {
    if (code === "401") {
      logout();
      router.push(API.AUTH.LOGOUT);
    } else {
      // router.push("/digibank");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleLogout}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
