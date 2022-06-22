import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Home() {
  const {open} = useContext(AppContext)
  return (
    <>
      <Box sx={{marginTop:'-64px', marginBottom:'10vh', minHeight:'100%', display:'flex', justifyContent:'space-between'}}>
        <Box>
          <Typography sx={{fontSize:'20vh', fontWeight:'bold'}}>
            FINANCE<br/>FIGHT
          </Typography>
        </Box>
        <img style={{height:'70vh', position:'absolute', top:'25vh', left:'30vw'}} src='https://res.cloudinary.com/detcvmtip/image/upload/v1655878466/finance%20fight/bitcoin-trading-chart-png_jqkpex_stq869.png'/>
        <Box>
          <Typography 
            variant = {(open) ? 'h5' : 'h4'} 
            sx={{
              width:(open) ? '20vw' : '35vw',
              lineHeight:'1.8', 
              mr:'2vw',
              mt:(open) ? '6vh' : '4vh'
            }}
            >
            Learn the skills and risks of investing without putting your own money on the line. Start off with $10k to purchase assets. Sell at anytime and purchase more. Checkout the leaderboard to see how your portfolio stacks up against other users. 
          </Typography>
        </Box>
      </Box>
      <Box sx={{marginTop:(open) ? '15vh' : '12vh'}}>
        <Typography sx={{textAlign:'center', width:'100%'}}>Data provided by:</Typography>
        <Typography sx={{textAlign:'center', width:'100%'}}>
          <a href='https://coinmarketcap.com/api/documentation/v1/' target='_blank' style={{color:'inherit'}}>CoinMarketCap</a>&nbsp;|&nbsp; 
          <a href='https://finage.co.uk/docs/api/getting-started' target='_blank' style={{color:'inherit'}}>Finage</a>&nbsp;|&nbsp;
          <a href='https://site.financialmodelingprep.com/developer/docs/' target='_blank' style={{color:'inherit'}}>Financial Modeling Prep</a>&nbsp;|&nbsp;
          <a href='https://finnhub.io/docs/api' target='_blank' style={{color:'inherit'}}>Finnhub</a>&nbsp;|&nbsp;
          <a href='https://www.tradingview.com/widget/' target='_blank' style={{color:'inherit'}}>TradingView</a>
        </Typography>
      </Box>
    </>

  )
}
