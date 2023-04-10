const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  notation: "compact",
  currency: "USD",
});

export const formatCurrencyCompact = formatter.format;
