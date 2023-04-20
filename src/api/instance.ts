import axios from "axios";


export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "a16bf247-86f1-4ef4-99af-302bbb5da3d0"
  },
})
