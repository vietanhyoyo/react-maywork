import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slice/userInfo.slice";
import profileReducer from "./slice/profile.slice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
