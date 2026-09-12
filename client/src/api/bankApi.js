import axiosClient from "./axiosClient";

export function fetchBanks() {
  return axiosClient.get("/banks").then((res) => res.data);
}

export function connectBank(payload) {
  return axiosClient.post("/banks/connect", payload).then((res) => res.data);
}
