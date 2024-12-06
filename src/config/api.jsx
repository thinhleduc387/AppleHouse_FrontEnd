import axios from "./axios_custom";

/* Module Auth */
export const callLogin = async (email, password) => {
  return axios.post("/auth/sign-in", { email, password });
};
export const callSignUp = async (email) => {
  return axios.post("/auth/sign-up", { email });
};
export const callLogout = () => {
  return axios.post("/auth/log-out");
};

export const callLoginGG = () => {
  return axios.post("/auth/google");
};

export const callAccount = async () => {
  return axios.get("/auth/account");
};

/*Category*/
export const getAllCategory = async () => {
  return axios.get("/category/all");
};

/*Product*/
export const getAllProductByCategory = async (categorySlug) => {
  return axios.post("/product/published/all", {
    categorySlug,
  });
};
export const getProduct = async (spu_id) => {
  return axios.get("/product/spu", {
    params: {
      spu_id,
    },
  });
};
