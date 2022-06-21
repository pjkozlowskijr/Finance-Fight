import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProfileForm from '../forms/ProfileForm';
import { AppContext } from '../context/AppContext';
import useGetUserAssets from '../hooks/useGetUserAssets'
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';
import { currencyChangeFormat, currencyFormat, formatChange, changeColor } from '../helpers';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useGetUserAssetValues from '../hooks/useGetUserAssetValues';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProfileStack() {
    const userAssets = useGetUserAssets()
    const user = useGetUserInfo()
    const dollarChange = formatChange(user?.bank-10000)
    const percentChange = formatChange(dollarChange/10000*100)
    const userValues = useGetUserAssetValues()

  return (
    <Box sx={{ width:'80%', margin:'auto'}}>
      <Stack spacing={3} divider={<Divider/>}>
        <Item>
          <Typography sx={{textAlign:'center'}} variant='h4'>{user?.first_name+' '+user?.last_name+' ('+user?.display_name+')'}</Typography>
          <table style={{width:'100%'}}>
            <tr>
              <th scope='col'>Cash Funds</th>
              <th scope='col'>Total Asset Costs</th>
              <th scope='col'>Dollar Change</th>
              <th scope='col'>Percent Change</th>
            </tr>
            <tr>
              <td>{currencyFormat(user?.bank)}</td>
              <td>{currencyFormat(userAssets?.assets?.assets.map(asset=>asset.value).reduce((x,y)=>x+y))}</td>
              <td style={{color:changeColor(dollarChange)}}>{currencyFormat(dollarChange)}</td>
              <td style={{color:changeColor(percentChange)}}>{percentChange}%</td>
            </tr>
          </table>
        </Item>
        <Item>
        <Typography>Assets</Typography>
        <table style={{width:'100%'}}>
          <tr>
            <th scope='col'>Asset</th>
            <th scope='col'>Type</th>
            <th scope='col'>Quantity Owned</th>
            <th scope='col'>Purchase Value</th>
            <th scope='col'>Current Value</th>
            <th scope='col'>Change</th>
          </tr>
        {userAssets?.assets?.assets.map((asset, index) => (
          <tr>
            <td>{asset.name+' ('+asset.symbol.toUpperCase()+')'}</td>
            <td>{asset.type}</td>
            <td>{asset.quantity}</td>
            <td>{currencyFormat(asset.value)}</td>
            <td>{currencyFormat(userValues?.prices[index][asset.symbol.toUpperCase()])}</td>
            <td>{currencyChangeFormat(userValues?.prices[index][asset.symbol.toUpperCase()]-asset.value)}</td>
          </tr>
        ))}
        </table>
        </Item>
        <Item>
            <Typography>Edit Profile</Typography>
            <ProfileForm user={user}/>
        </Item>
      </Stack>
    </Box>
  );
}