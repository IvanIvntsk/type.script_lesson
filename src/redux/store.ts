import {configureStore} from "@reduxjs/toolkit";
import {carReducer} from "./slices/carSlice";

const store = configureStore({
    reducer:{
        cars: carReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {RootState, AppDispatch}
export {store}