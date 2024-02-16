import React, { FC } from "react";
import { getConfig } from "utils/config";

export const DisplayPrice: FC<{ children: number }> = ({ children }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  const symbol = getConfig((config) => config.template.currencySymbol);
  if (getConfig((config) => config.template.prefixCurrencySymbol)) {
    return (
      <>
        {symbol}
        {numberWithCommas(children)}
      </>
    );
  } else {
    return (
      <>
        {numberWithCommas(children)}
        {symbol}
      </>
    );
  }
};
