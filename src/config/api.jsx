import axios from "./axios_custom"

/* Module Auth */
export const callLogin = async (email, password) => {
    return axios.post("/login", { email, password });
  };
  export const callSignUp = () => {
    return axios.get("/signup");
  };
  export const callLogout = () => {
    return axios.post("/logout");
  };