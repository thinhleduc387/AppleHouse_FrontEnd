import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});
instance.interceptors.request.use(
  function (config) {
    if (window.localStorage.getItem("user_id")) {
      config.headers["x-client-id"] = window.localStorage.getItem("user_id");
    }
    if (
      window !== "undefined" &&
      window &&
      window.localStorage &&
      window.localStorage.getItem("access_token")
    ) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const statusCode = error?.response?.status;

    switch (statusCode) {
      case 403:
        window.location.href = "/access-denied";
        break;
      case 401:

      case 404:
        break;

      // Có thể thêm các case khác ...
    }
    return error?.response?.data || Promise.reject(error);
  }
);
export default instance;
