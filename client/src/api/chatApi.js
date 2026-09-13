import axiosClient from "./axiosClient";

export function fetchChatHistory() {
  return axiosClient.get("/chat/messages").then((res) => res.data);
}

export function sendChatMessage(message) {
  return axiosClient.post("/chat/message", { message }).then((res) => res.data);
}
