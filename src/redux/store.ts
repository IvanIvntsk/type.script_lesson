import {configureStore} from "@reduxjs/toolkit";
import {carReducer} from "./slices/carSlice";
import {authReducer} from "./slices/authSlice";

const store = configureStore({
    reducer:{
        cars: carReducer,
        auth:authReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {RootState, AppDispatch}
export {store}