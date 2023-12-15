import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>(); // useParams는 URl의 파라미터들을 반환하는 함수
  // const { coinId } = useParams<coinId:string>();  // 이렇게 해도 됨
  return <h1>COIN : {coinId}</h1>;
}
export default Coin;
