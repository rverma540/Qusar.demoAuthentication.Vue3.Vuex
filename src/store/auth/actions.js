import { api } from "src/boot/axios";

export const doLogin = async ({ commit, dispatch }, payload) => {
  await api.post("/login", payload).then((response) => {
    const token = response.data;
    // localStorage.setItem('token', response.data.token);
    commit("setToken", token);
    api.defaults.headers.common.Authorization = "JWT" + token.access;
    dispatch("getMe", token);
  });
};

export const signOut = async ({ commit, dispatch }, payload) => {
  api.defaults.headers.common.Authorization = "";
  commit("removetoken");
};

export const getMe = async ({ commit, dispatch }, token) => {
  await api.get("/register", token.access).then((response) => {
    commit("setMe", response.data);
  });
};

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem("token");
  if (token) {
    await commit("setToken", JSON.parse(token));
    api.defaults.headers.common.Authorization =
      "JWT " + JSON.parse(token).access;
    dispatch("getMe", JSON.parse(token));
  } else {
    commit("removeToken");
  }
};
