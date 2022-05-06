import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
  page: number;
  perPage: number;
  coinId: string | undefined;
}

const initialState = {
  page: 1,
  perPage: 100,
  coinId: undefined,
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
    setCurrentCoinId: (state, action: PayloadAction<string | undefined>) => {
      state.coinId = action.payload;
    },
  },
});

export const { pageReducer, perPageReducer, setCurrentCoinId } =
  appSlice.actions;

export const pageState = (state: RootState) => state.app.page;
export const perPageState = (state: RootState) => state.app.perPage;
export const currentCoinState = (state: RootState) => state.app.coinId;

export default appSlice.reducer;
