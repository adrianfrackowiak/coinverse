import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./features/appSlice";
import { userSlice } from "./features/userSlice";

export const store = configureStore({
  reducer: { app: appSlice.reducer, portfolio: userSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
