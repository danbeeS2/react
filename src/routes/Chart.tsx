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
  isDark: boolean;
}

function Chart({ coinId, isDark }: chartProps) {
  const { isLoading, data } = useQuery<IData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // {
    //   refetchInterval: 10000,
    // }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : Array.isArray(data) ? (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
              // data: data?.map((price) => parseFloat(price.close)) ?? [],
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
            title: {
              text: `${coinId} chart`,
              align: "left",
            },
            grid: { show: false },
            theme: { mode: isDark ? "dark" : "light" },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map(
                (price) => new Date(price.time_close * 1000).toUTCString() // 초 단위를 날짜로 바꾸기
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      ) : (
        <p>NO Data</p>
      )}
    </div>
  );
}

export default Chart;
