import axios, {AxiosError, AxiosResponse} from "axios";
import {baseURL, urls} from "../constants";
import {authServices} from "./authServices";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {router} from "../router";

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

const waitList:IWaitList[] = []
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
                    afterRefresh()
                    return apiServices(originalRequest)
                }catch (e){
                    authServices.deleteTokens()
                    isRefreshing = false
                    router.navigate('/login?SessionExpired=true')
                    return Promise.reject(error)
                }
            }
        if (originalRequest.url === urls.auth.refresh){
            return Promise.reject(error)
        }
        return new Promise(resolve => {
            subscribeToWaitList(() => resolve(apiServices(originalRequest)))
        })
        }

        return Promise.reject(error)
    }
)
type IWaitList = () => void
const subscribeToWaitList =(cb:IWaitList):void => {
    waitList.push(cb)
}
const afterRefresh = ():void => {
    while (waitList.length) {
        const cb = waitList.pop()
        cb()
    }
}

export {apiServices}
export type {IRes}