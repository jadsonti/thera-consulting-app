import axios from "axios";

export const clienteApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
