import axiosClient from "./axiosClient";

export function registerRequest(payload) {
  return axiosClient.post("/auth/register", payload).then((res) => res.data);
}

export function loginRequest(payload) {
  return axiosClient.post("/auth/login", payload).then((res) => res.data);
}

export function fetchMe() {
  return axiosClient.get("/auth/me").then((res) => res.data);
}
