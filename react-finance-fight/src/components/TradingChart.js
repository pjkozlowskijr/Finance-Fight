// //////////////////////////////
// TRADING VIEW WIDGET
// //////////////////////////////

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
      autosize={true}
      height={500}
    />
  );
};

export default TradingChart;
