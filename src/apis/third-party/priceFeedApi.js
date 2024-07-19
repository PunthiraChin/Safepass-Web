import axios from "axios";

const priceFeedApi = {};
// get price data from coingecko
priceFeedApi.cryptoToUsd = (coinId) =>
  axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&x_cg_demo_api_key=${
      import.meta.env.VITE_COINGECKO_API_KEY
    }`
  );

export default priceFeedApi;

