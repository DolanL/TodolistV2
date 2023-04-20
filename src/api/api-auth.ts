import {authProperties, ResponseType} from "../types/types";
import {instance} from "./instance";
import {AxiosResponse} from "axios";


export const APIauth = {
  login(data: authProperties) {
    return instance.post<'', AxiosResponse<ResponseType<{userId: string}>>, authProperties>('/auth/login', data)
  },
  me() {
    return instance.get('/auth/me')
  },
  logOut() {
    return instance.delete('/auth/login')
  }
}