import axios, {AxiosError, AxiosResponse} from "axios";
import {baseURL} from "../constants";
import {authServices} from "./authServices";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const apiServices = axios.create({baseURL})

apiServices.interceptors.request.use(req=>{
    const access = authServices.getAccessToken()

    if (access){
        req.headers.Authorization = `Bearer ${access}`
    }

    return req
})
let isRefreshing = false
apiServices.interceptors.response.use(
    res =>{
        return res
    },
    async (error:AxiosError)=>{
        const originalRequest = error.config

        if (error.response.status === 401){
            if (!isRefreshing){
                try {
                    await authServices.refresh()
                    isRefreshing = false
                    return apiServices(originalRequest)
                }catch (e){
                    authServices.deleteTokens()
                    isRefreshing = false
                    return Promise.reject(error)
                }
            }
        }
        return Promise.reject(error)
    }
)

export {apiServices}
export type {IRes}