import API from "@/configs/API";

async function signIn({
  code,
  redirect_uri,
}: {
  code: string;
  redirect_uri: string;
}) {
  const response = await fetch(`${API.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, redirect_uri }),
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw { code: response.status.toString(), message: data?.message };
    throw new Error(data?.message);
  }

  return {
    access_token: data?.data.access_token,
    refresh_token: data?.data.refresh_token,
  };
}

async function tokenRefresh({ refreshToken }: { refreshToken: string }) {
  const response = await fetch(`${API.AUTH.REFRESH_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw { code: "401", message: "Phiên đăng nhập hết hạn" };
  }
  return {
    access_token: data?.data.access_token,
    refresh_token: data?.data.refresh_token,
  };
}

export default Object.freeze({ signIn, tokenRefresh });
