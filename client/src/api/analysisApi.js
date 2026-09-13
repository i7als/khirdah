import axiosClient from "./axiosClient";

export function fetchSummary(range = {}) {
  return axiosClient.get("/analysis/summary", { params: range }).then((res) => res.data);
}

export function fetchByCategory(range = {}) {
  return axiosClient.get("/analysis/by-category", { params: range }).then((res) => res.data);
}

export function fetchTrend(months = 6) {
  return axiosClient.get("/analysis/trend", { params: { months } }).then((res) => res.data);
}
