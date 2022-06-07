import { configureStore } from "@reduxjs/toolkit"
import userInfoReducer from "./slice/userInfo.slice"

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch