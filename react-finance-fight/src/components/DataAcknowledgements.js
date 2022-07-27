import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function DataAcknowledgements() {
  return (
    <>
      <Box sx={{marginTop:'15vh'}}>
        <Typography sx={{textAlign:'center', width:'100%'}}>Data provided by:</Typography>
        <Typography sx={{textAlign:'center', width:'100%'}}>
          <a href='https://coinmarketcap.com/api/documentation/v1/' target='_blank' rel="noreferrer" style={{color:'inherit'}}>CoinMarketCap</a>&nbsp;|&nbsp; 
          <a href='https://finage.co.uk/docs/api/getting-started' target='_blank' rel="noreferrer" style={{color:'inherit'}}>Finage</a>&nbsp;|&nbsp;
          <a href='https://site.financialmodelingprep.com/developer/docs/' target='_blank' rel="noreferrer" style={{color:'inherit'}}>Financial Modeling Prep</a>&nbsp;|&nbsp;
          <a href='https://finnhub.io/docs/api' target='_blank' rel="noreferrer" style={{color:'inherit'}}>Finnhub</a>&nbsp;|&nbsp;
          <a href='https://www.tradingview.com/widget/' target='_blank' rel="noreferrer" style={{color:'inherit'}}>TradingView</a>
        </Typography>
      </Box>
    </>
  )
}

