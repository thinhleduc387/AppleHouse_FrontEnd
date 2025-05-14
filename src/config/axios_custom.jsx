import axios from "axios";
// import store from "../redux/store";
// import { setUserLoginInfo } from "../redux/slices/accountSlice";

// axios instance chính
const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// axios instance riêng cho refresh token (không interceptor)
const refreshTokenInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Hàm lấy cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// custom header
const NO_RETRY_HEADER = "x-no-retry";

// interceptor request cho instance chính
instance.interceptors.request.use(
  function (config) {
    if (window.localStorage.getItem("user_id")) {
      config.headers["x-client-id"] = window.localStorage.getItem("user_id");
    }
    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("access_token")
    ) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    // truyền refreshToken nếu là call refresh
    if (config.url.includes("/auth/handleRefreshToken")) {
      const refreshToken = getCookie("refresh_token");
      if (refreshToken) {
        config.headers["refreshToken"] = refreshToken;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// interceptor response cho instance chính
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const statusCode = error?.response?.status;
    const originalRequest = error.config;

    switch (statusCode) {
      case 403:
        window.location.href = "/access-denied";
        break;

      // case 401:
      //   try {
      //     if (
      //       !originalRequest._retry &&
      //       originalRequest.url !== "/auth/sign-in" &&
      //       !originalRequest.headers[NO_RETRY_HEADER]
      //     ) {
      //       originalRequest._retry = true;

      //       // Gọi refresh token bằng instance riêng không có interceptor
      //       const response = await refreshTokenInstance.get(
      //         "/auth/handleRefreshToken",
      //         {
      //           headers: {
      //             refreshToken: getCookie("refresh_token"),
      //           },
      //         }
      //       );

      //       const newToken = response?.data?.metadata?.accessToken;
      //       const userId = response?.data?.metadata?.user?._id;

      //       if (newToken) {
      //         // Cập nhật localStorage
      //         localStorage.setItem("access_token", newToken);
      //         localStorage.setItem("user_id", userId);

      //         // Cập nhật header cho request cũ và gửi lại
      //         originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      //         return instance.request(originalRequest);
      //       }
      //     }
      //   } catch (e) {
      //     console.log("Refresh Token Error:", e);
      //     // nếu refresh fail → logout hoặc redirect login
      //     window.location.href = "/sign-in";
      //   }
      //   break;

      case 404:
        // có thể xử lý 404 ở đây
        break;

      // Thêm case khác nếu cần
    }

    return Promise.reject(error?.response?.data || error);
  }
);

export default instance;
