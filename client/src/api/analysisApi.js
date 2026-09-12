import axiosClient from "./axiosClient";

export function fetchSummary() {
  return axiosClient.get("/analysis/summary").then((res) => res.data);
}

export function fetchByCategory() {
  return axiosClient.get("/analysis/by-category").then((res) => res.data);
}

export function fetchTrend(months = 6) {
  return axiosClient.get("/analysis/trend", { params: { months } }).then((res) => res.data);
}
