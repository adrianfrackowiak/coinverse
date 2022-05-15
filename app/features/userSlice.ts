import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserState {
  email: string;
  id: string;
  isPortfolio: boolean;
  portfolio: IPortfolio;
}

export interface IPortfolio {
  portfolioName: string;
  coins: ICoin[];
  balance: number;
}

export interface ICoin {
  name: string;
  holdings: number;
  buyPrice: number;
  id: string;
  portfolioId: string;
}

const initialState = {
  email: "",
  id: "",
  isPortfolio: false,
  portfolio: {
    portfolioName: "",
    coins: [],
    balance: 0,
  },
} as IUserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state: IUserState,
      action: PayloadAction<{ email: string; id: string }>
    ) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    isPortfolio: (state: IUserState, action: PayloadAction<boolean>) => {
      state.isPortfolio = action.payload;
    },
    setPortfolioName: (state: IUserState, action: PayloadAction<string>) => {
      state.portfolio.portfolioName = action.payload;
    },
    setCoins: (state: IUserState, action: PayloadAction<ICoin[]>) => {
      state.portfolio.coins = action.payload;
    },
    calculatePortfolioBalance: (
      state: IUserState,
      action: PayloadAction<number>
    ) => {
      state.portfolio.balance = action.payload;
    },
  },
});

export const {
  setUserData,
  isPortfolio,
  setPortfolioName,
  setCoins,
  calculatePortfolioBalance,
} = userSlice.actions;
export default userSlice.reducer;
