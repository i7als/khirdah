import axiosClient from "./axiosClient";

export function fetchTransactions(params) {
  return axiosClient.get("/transactions", { params }).then((res) => res.data);
}

export function fetchTransaction(id) {
  return axiosClient.get(`/transactions/${id}`).then((res) => res.data);
}

export function updateTransactionCategory(id, category) {
  return axiosClient.patch(`/transactions/${id}/category`, { category }).then((res) => res.data);
}
