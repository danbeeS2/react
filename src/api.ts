const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchCoinHistory(coinId: string) {
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  )
    // const endDate = Math.floor(Date.now() / 1000); // 현재
    // const startDate = endDate - 60 * 60 * 24 * 7 * 2; // 현재으로부터 이주일 전
    // await fetch(`${BASE_URL}/tickers/${coinId}/ohlcv/historcal?start=${startDate}&end={endDate}`) coinpaprika의 유료화로 인해 데이터를 가져올 수 없음
    .json();
}
