import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { currentCoinState } from "../../../app/features/appSlice";
import { useMarketChart } from "../../../app/hooks/useData";

export const ChartBox = () => {
  const stateCoinId = useSelector(currentCoinState);
  const { data, isLoading, isError } = useMarketChart(
    typeof stateCoinId === "string" ? stateCoinId : ""
  );
  const [chartData, setChartData] = useState([[]]);
  const options = {
    title: `${stateCoinId} to USD`,
    curveType: "function",
    series: [{ color: "#4f35de" }],
    legend: "none",
  };

  useEffect(() => {
    if (data?.prices) {
      setChartData([
        ["Time", "Price"],
        ...data.prices.map((dt: number[], index: number) => {
          return [new Date(dt[0]), dt[1]];
        }),
      ]);
    }
  }, [data]);

  if (isError) console.error(isError);
  if (isLoading) return <p>Loading...</p>;

  return (
    <Box>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </Box>
  );
};
