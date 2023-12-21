import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface chartProps {
  coinId: string;
}

function Chart({ coinId }: chartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
              // ??: null 병합 연산자 (앞의 값이 null 또는 undefined일 때 [](뒤의 값) 반환)
              // close 데이터가 string이기 때문에 parseFloat를 통해 형 변환을 시켜줘야 함
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
