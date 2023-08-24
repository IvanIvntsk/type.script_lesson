import axios, {AxiosResponse} from "axios";
import {baseURL} from "../constants";

type IRes<DATA> = Promise<AxiosResponse<DATA>>

const apiServices = axios.create({baseURL})

export {apiServices}
export type {IRes}