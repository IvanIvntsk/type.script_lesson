import {IAuth} from "../interfaces/authInterface";
import {apiServices, IRes} from "./apiServices";
import {IUser} from "../interfaces/userInterface";
import {urls} from "../constants";
import {ITokens} from "../interfaces/tokensInterface";

const accessTokenKey = 'access'
const refreshTokenKey = 'refresh'
const authServices = {
    register(user:IAuth):IRes<IUser>{
        return apiServices.post(urls.auth.register, user)
    },
    async login(user:IAuth):Promise<IUser>{
        const {data} = await apiServices.post<ITokens>(urls.auth.login, user)
        this.setTokens(data)
        const {data:me} = await this.me()
        return me
    },
    me():IRes<IUser>{
        return apiServices.get(urls.auth.me)
    },
    setTokens({refresh,access}:ITokens):void{
        localStorage.setItem(accessTokenKey,access)
        localStorage.setItem(refreshTokenKey,refresh)
    },

    getAccessToken():string{
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken():string{
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens():void{
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }
}

export {authServices}