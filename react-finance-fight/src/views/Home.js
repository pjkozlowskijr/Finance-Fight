import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import DataAcknowledgements from '../components/DataAcknowledgements';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

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
      <DataAcknowledgements/>
    </>

  )
}
