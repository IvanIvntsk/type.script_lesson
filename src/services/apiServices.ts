import axios, {AxiosResponse} from "axios";
import {baseURL} from "../constants";
import {authServices} from "./authServices";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const apiServices = axios.create({baseURL})

apiServices.interceptors.request.use(req=>{
    const access = authServices.getAccessToken()

    if (access){
        req.headers.Authorization = `Bearer ${access}`
    }

    return req
})

export {apiServices}
export type {IRes}