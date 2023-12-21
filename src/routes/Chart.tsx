import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface chartProps {
  coinId: string;
}

function Chart({ coinId }: chartProps) {
  const {} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <h1>Chart</h1>;
}

export default Chart;
