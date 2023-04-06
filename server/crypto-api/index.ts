import { createError, sendError } from "h3";
import type { H3Event } from "h3";
import type { IListData } from "~/server/crypto-api/types";
import { CURRENCIES_WHITELIST } from "~/types";

export const API_URL = "https://pro-api.coinmarketcap.com";

const callApi = (endpoint: string, options: RequestInit = {}) =>
  fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "X-CMC_PRO_API_KEY": import.meta.env.VITE_NUXT_CRYPTO_API_KEY as string,
      "Access-Control-Allow-Origin": "*",
      ...options?.headers,
    },
  });

export const listCurrencies = (): Promise<Response> =>
  callApi("/v1/cryptocurrency/listings/latest");

export const handleApiError = (event: H3Event, response: Response) => {
  sendError(
    event,
    createError({
      statusCode: response.status || 500,
      statusMessage: response?.statusText || "Internal Server Error",
    }),
    false
  );
};
