import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import APIAccessor from "../../services/apiProcessor";
import { IUserInfo } from "src/commons/interfaces";
import {
  IUserSetting,
  IOrganizationList,
  ITeamList,
} from "src/screens/account/interfaces";
import Constants from "../../constants/index";

export interface ProfileState {
  userInfo: IUserInfo;
  userSetting: IUserSetting;
  teamList: ITeamList[];
  organizationList: IOrganizationList[];
}

export const getUserSetting: any = createAsyncThunk(
  "userSetting/get",
  async () => {
    const response = (
      await APIAccessor.get({
        path: "userSetting/get",
        headers: {
          "x-access-token": sessionStorage.getItem(
            Constants.StorageKeys.ACCESS_TOKEN
          ),
        },
      })
    ).response;
    return response;
  }
);

export const getTeamList: any = createAsyncThunk("team/list", async () => {
  const response = (
    await APIAccessor.get({
      path: "team/list",
      headers: {
        "x-access-token": sessionStorage.getItem(
          Constants.StorageKeys.ACCESS_TOKEN
        ),
      },
    })
  ).response;
  return response;
});

export const getOrganizationList: any = createAsyncThunk(
  "organization/list",
  async () => {
    const response = (
      await APIAccessor.get({
        path: "organization/list",
        headers: {
          "x-access-token": sessionStorage.getItem(
            Constants.StorageKeys.ACCESS_TOKEN
          ),
        },
      })
    ).response;
    return response;
  }
);

const initialState: ProfileState = {
  userInfo: {},
  userSetting: {},
  teamList: [],
  organizationList: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserSetting: (state, action: PayloadAction<any>) => {
      state.userSetting = action.payload;
    },
    setTeamId: (state, action: PayloadAction<any>) => {
      state.userSetting.teamId = action.payload;
    },
    setOrganizationId: (state, action: PayloadAction<any>) => {
      state.userSetting.organizationId = action.payload;
    },
    setTeamList: (state, action: PayloadAction<any>) => {
      state.teamList = action.payload;
    },
    setOrganizationList: (state, action: PayloadAction<any>) => {
      state.organizationList = action.payload;
    },
    storeUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSetting.fulfilled, (state, action) => {
        state.userSetting = action.payload.data;
        console.log(action.payload);
      })
      .addCase(getTeamList.fulfilled, (state, action) => {
        state.teamList = action.payload.data;
      })
      .addCase(getOrganizationList.fulfilled, (state, action) => {
        state.organizationList = action.payload.data;
      });
  },
});

export const {
  setUserSetting,
  setOrganizationId,
  setTeamId,
  setOrganizationList,
  setTeamList,
  storeUserInfo,
} = profileSlice.actions;

export default profileSlice.reducer;
