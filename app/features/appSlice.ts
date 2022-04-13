import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
  page: number;
  perPage: number;
}

const initialState = {
  page: 1,
  perPage: 100,
} as IAppState;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    pageReducer: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    perPageReducer: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
});

export const { pageReducer } = appSlice.actions;

export const pageState = (state: RootState) => state.app.page;
export const perPageState = (state: RootState) => state.app.perPage;

export default appSlice.reducer;
