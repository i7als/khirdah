import axiosClient from "./axiosClient";

export function fetchAccounts() {
  return axiosClient.get("/accounts").then((res) => res.data);
}

export function fetchAccount(id) {
  return axiosClient.get(`/accounts/${id}`).then((res) => res.data);
}
