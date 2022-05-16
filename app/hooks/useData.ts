import axios from "axios";
import useSWR from "swr";
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useCryptoListData(page: number, perPage: number) {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGlobalData() {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/global`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCoinData(coinId: string) {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true'`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useMarketChart(coinId: string) {
  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePrismaData() {
  const { data, error } = useSWR("/api/portfolio/get", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
