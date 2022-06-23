// //////////////////////////////
// HELP PAGE
// //////////////////////////////

import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import DataAcknowledgements from '../components/DataAcknowledgements'

export default function Help() {
  return (
    <>
    <Paper sx={{width:'60%', margin:'auto', mt:'-64px', p:5}}>
      <Typography variant='h2' sx={{fontWeight:'bold', textAlign:'center'}}>
        Frequently Asked Questions
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        What is Finance Fight?
      </Typography>
      <Typography variant='h6'>
        Finance Fight is a risk-free way to learn the skills and dynamics of investing. You start off with $10,000 in bank funds to buy and sell assets as you wish. Check your account periodically to see how your investments are doing. You can also view the leaderboard to see how you stack up against other users. 
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        Do I need money to participate?
      </Typography>
      <Typography variant='h6'>
        No. Finance Fight is meant to give the average person a risk-free way to test their investing skills. You will never be asked to deposit money.
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        Can I search by company name?
      </Typography>
      <Typography variant='h6'>
        Not at this time. Our asset lookup tool is currently calibrated to accept TICKER SYMBOLS ONLY. We hope to add functionality to search via company name in the future.
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        How do I buy/sell assets?
      </Typography>
      <Typography variant='h6'>
        You can buy assets directly from the asset lookup tool once your result has populated. Assets that are currently in your portfolio may be bought and sold from your profile page. All you have to do is select the amount of the asset to buy/sell and submit the request.
        <br/><br/>
        Note: just like in real life, you will not be able to purchase assets for which you do not have enough funds.
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        How are the leaderboard rankings determined?
      </Typography>
      <Typography variant='h6'>
        Leaderboard rankings are determined by each user's current total asset values. Current values are calculated upon page load. We hope to provide more functionality to sort this table by other datapoints in the future.
      </Typography>
      <Typography variant='h4' sx={{fontWeight:'bold', mt:5}}>
        Customer Service
      </Typography>
      <Typography variant='h6'>
        <ul style={{listStyle:'none', paddingLeft:0}}>
          <li style={{marginLeft:0}}>Phone: (800) 382-5633</li>
          <li>Email: help@financefight.com</li>
        </ul>
      </Typography>
    </Paper>
    <Box sx={{mt:'-10vh'}}>
      <DataAcknowledgements/>
    </Box>
    </>
  )
}
