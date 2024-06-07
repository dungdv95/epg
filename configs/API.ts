import { generateUUID } from "@/lib/utils";

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;

const NEXT_PUBLIC_CONNECT_URL = `https://${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_ROOT_URL}/auth/realms/airsoft-internal/protocol/openid-connect`;
const origin =
  typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "";
export const redirectUri = `${origin}/login`;
const state = generateUUID();

const API = {
  AUTH: {
    REDIRECT: `${NEXT_PUBLIC_CONNECT_URL}/auth?client_id=${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=openid&state=${state}`,
    LOGIN: `${API_ROOT}/auth/login-by-code`,
    REFRESH_TOKEN: `${API_ROOT}/auth/refresh-token`,
    LOGOUT: `${NEXT_PUBLIC_CONNECT_URL}/logout?post_logout_redirect_uri=${redirectUri}&client_id=${process.env.NEXT_PUBLIC_CONNECT_INTERNAL_CLIENT_ID}`,
  },
  MERCHANTS: {
    GET: `${API_ROOT}/cms/merchants`,
  },
  ENTERPRISE: {
    MERTCHANT: `${API_ROOT}/corp/merchants`,
    PARTNER: `${API_ROOT}/corp/partners`,
  },
};

export default API;
