import React, { useRef } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const TradingChart = ({symbol}) => {
  const tradingRef = useRef(null);

  return (
    <TradingViewWidget
      symbol={symbol}
      theme={Themes.LIGHT}
      locale="en"
      ref={tradingRef}
      height={500}
      width={'100%'}
    />
  );
};

export default TradingChart;
