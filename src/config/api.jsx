import axios from "./axios_custom"

/* Module Auth */
export const callLogin = async (email, password) => {
    return axios.post("/login", { email, password });
  };
  export const callSignUp = async (email) => {
    return axios.post("/user/new_user", {email});
  };
  export const callLogout = () => {
    return axios.post("/logout");
  };