import { ICoin } from "../features/userSlice";

export const calcBalance = (coin: ICoin, data: any) => {
  if (data) {
    const filteredCoin = data.filter((val: { id: string }) => {
      return val.id === coin.name;
    });

    let holdings = coin.holdings * filteredCoin[0].current_price;
    let profitOrLoss = holdings - coin.buyPrice * coin.holdings;

    return { filteredCoin, holdings, profitOrLoss };
  }

  return { filteredCoin: [], holdings: 0, profitOrLoss: 0 };
};
