import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IAuth} from "../../interfaces/authInterface";
import {AxiosError} from "axios";
import {authServices} from "../../services/authServices";
import {IUser} from "../../interfaces/userInterface";

interface IState {
    errors:{
    username?:string[],
        detail?:string

    },
    me:IUser
}
const initialState:IState ={
    errors:null,
    me:null
};
const register = createAsyncThunk<void, {user:IAuth}>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) =>{
        try {
            await authServices.register(user)
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await authServices.me()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const login = createAsyncThunk<IUser, {user:IAuth}>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const me = await authServices.login(user)
            return me
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)
const authSlice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(login.fulfilled, (state, action) => {
            state.me = action.payload
        })
        .addCase(me.fulfilled, (state, action) => {
            state.me = action.payload
        })
        .addMatcher(isRejected(),(state,action) => {
            state.errors = action.payload
        })
        .addMatcher(isFulfilled(), state=> {
            state.errors = null
        })
})

const {reducer:authReducer, actions} = authSlice


const authActions = {
    ...actions,
    register,
    login,
    me
}

export {authActions, authReducer}