"use client";

import LoadingRotate from "@/components/loading/loading-rotate";
import { useToast } from "@/components/ui/use-toast";
import API from "@/configs/API";
import { dataToken } from "@/configs/auth";
import apis from "@/lib/apis/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLoginStore } from "./store";

function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const { isLogged, login } = useLoginStore();
  const [codeLoading, setCodeLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = () => {
    if (!isLogged) {
      window.location.href = API.AUTH.REDIRECT;
    }
  };

  const loginHandle = async (code: string) => {
    setLoginLoading(true);
    try {
      const { redirect_uri } = dataToken;
      const data = await apis.signIn({ code, redirect_uri });

      login(data.access_token, data.refresh_token);
    } catch (err) {
      toast({
        variant: "destructive",
        title: `${err}`,
      });
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      router.push("/");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    let code = params.get("code");
    if (code) {
      loginHandle(code);
    } else {
      setCodeLoading(false);
    }
  }, [isLogged]);

  if (codeLoading || loginLoading) {
    return <LoadingRotate />;
  }

  return (
    <>
      <div className="relative h-screen">
        {/* <Image
          alt=""
          src={logo.src}
          className={`h-auto w-auto absolute top-4 left-4`}
          width={120}
          height={0}
          priority
        /> */}
        <div
          style={{ backgroundImage: "url('/asset/home-icons/banner.jpg')" }}
          className="h-full bg-center bg-cover blur-sm"
        ></div>
        <div className="absolute left-0 right-0 bottom-0 top-0 mx-auto my-auto flex flex-col justify-center ">
          <div className="mx-auto w-full max-w-[26rem]">
            <div className="bg-slate-100/95 py-8 px-4 shadow-[0_0_55px_0_rgba(0,0,0,0.3)] sm:rounded-lg sm:px-10">
              <h2 className="text-xl md:text-2xl font-semibold text-center text-sky-700 mb-4">
                NPS Dashboard
              </h2>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-[#075985] py-3 px-3 text-base font-semibold text-white shadow-sm hover:bg-[#0369a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
