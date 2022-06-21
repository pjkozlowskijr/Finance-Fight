import React from 'react'
import {StockMarket} from 'react-ts-tradingview-widgets'
import {CryptoCurrencyMarket} from 'react-ts-tradingview-widgets'

export default function MarketOverview() {
  return (
    <>
    <StockMarket/>
    <CryptoCurrencyMarket/>
    </>
  )
}
