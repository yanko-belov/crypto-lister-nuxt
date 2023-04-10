import { listCurrencies, handleApiError } from "~/server/crypto-api";
import type { H3Event } from "h3";
import type { IListData } from "~/server/crypto-api/types";
import type { ICurrency } from "~/types";

export const CURRENCIES_WHITELIST: string[] = [
  "ada",
  "avax",
  "bnb",
  "btc",
  "busd",
  "dai",
  "doge",
  "dot",
  "eth",
  "matic",
  "shib",
  "sol",
  "trx",
  "uni",
  "usdc",
  "usdt",
  "wbtc",
  "xrp",
];

const convertListCurrenciesData = (dataJson: IListData): ICurrency[] => {
  // Filter out currencies that are not in the whitelist
  // This is done to reduce the size of the response
  // This is done here as the FREE API doesn't support filtering...
  // Then the data is converted to match the expected format
  return dataJson.data
    .filter((currency) =>
      CURRENCIES_WHITELIST.includes(currency.symbol.toLowerCase())
    )
    .map((currency) => ({
      id: currency.id,
      name: currency.symbol,
      symbol: currency.symbol.toLowerCase(),
      quote: {
        USD: {
          price: currency.quote.USD.price,
          volume_24h: currency.quote.USD.volume_24h,
          market_cap: currency.quote.USD.market_cap,
        },
      },
      tags: currency.tags,
      circulating_supply: currency.circulating_supply,
    }));
};

const generateResponse = (dataJson: IListData) => {
  return {
    data: convertListCurrenciesData(dataJson),
    timestamp: dataJson.status.timestamp,
  };
};

export default defineEventHandler(async (event: H3Event) => {
  const response: Response = await listCurrencies();
  if (!response.ok) {
    return handleApiError(event, response);
  }

  return generateResponse(await response.json());
});
