// import { useLoginStore } from "@/app/sign-in/store";
import { useLoginStore } from "@/app/login/store";
import { unstable_batchedUpdates } from "react-dom";

export function customFetch(input: any, options: any) {
  const token = unstable_batchedUpdates(() => {
    return useLoginStore.getState().accessToken;
  });
  return fetch(input, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
