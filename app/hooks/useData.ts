import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useData(page: number, perPage: number) {
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
