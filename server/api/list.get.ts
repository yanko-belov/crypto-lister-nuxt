import {
  listCurrencies,
  handleApiError,
  convertListCurrenciesData,
} from "~/server/crypto-api";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const response: Response = await listCurrencies();
  if (!response.ok) {
    return handleApiError(event, response);
  }

  return convertListCurrenciesData(await response.json());
});
