import Typography from '@mui/material/Typography'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import useGetAllUsers from '../hooks/useGetAllUsers'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { currencyFormat } from '../helpers';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserLeaderboard() {
  const users = useGetAllUsers()

  if (!users){
    return(
        <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress/>
        </Box>
    )
  }

  return (
    <Box sx={{width:'60%', m:'auto'}}>
      <Typography sx={{textAlign:'center'}}>Leaderboard</Typography>
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">User</th>
            <th scope="col">Total Value</th>
            <th scope="col">Asset Value</th>
            <th scope="col">Companies Held</th>
            <th scope="col">Total Shares</th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map((user, index) => (
            <tr key={user?.display_name} style={{textAlign:'center'}}>
              <td>{index + 1}</td>
              <td>{user?.display_name}</td>
              <td>{currencyFormat(user?.total_value)}</td>
              <td>{currencyFormat(user?.asset_value)}</td>
              <td>{user?.qty_company}</td>
              <td>{user?.qty_assets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}
