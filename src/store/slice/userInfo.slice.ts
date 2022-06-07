import { IUserInfo } from "src/commons/interfaces"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserInfoState {
    value: IUserInfo
}

const initialState: UserInfoState = {
    value: {}
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        storeUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { storeUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer