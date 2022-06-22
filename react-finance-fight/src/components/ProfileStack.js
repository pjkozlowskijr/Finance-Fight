import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProfileForm from '../forms/ProfileForm';
import { AppContext } from '../context/AppContext';
import useGetUserAssets from '../hooks/useGetUserAssets'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { currencyChangeFormat, currencyFormat, formatChange, changeColor } from '../helpers';
import useGetUserInfo from '../hooks/useGetUserInfo';
import useGetUserAssetValues from '../hooks/useGetUserAssetValues';
import SellAssetModal from './SellAssetModal';

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
  const userValues = useGetUserAssetValues()
  const dollarChange = formatChange(user?.bank-10000)
  const percentChange = formatChange(dollarChange/10000*100)

  return (
    <Box sx={{ width:'80%', margin:'auto'}}>
      <Stack spacing={3} divider={<Divider/>}>
        <Item>
          <Typography sx={{textAlign:'center'}} variant='h4'>{user?.first_name+' '+user?.last_name+' ('+user?.display_name+')'}</Typography>
          <table style={{width:'100%'}}>
            <thead>
              <tr>
                <th scope='col'>Cash Funds</th>
                <th scope='col'>Total Asset Costs</th>
                <th scope='col'>Dollar Change</th>
                <th scope='col'>Percent Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currencyFormat(user?.bank)}</td>
                <td>{currencyFormat(userAssets?.assets?.assets?.map(asset=>asset.value)?.reduce((x,y)=>x+y))}</td>
                <td style={{color:changeColor(dollarChange)}}>{currencyFormat(dollarChange)}</td>
                <td style={{color:changeColor(percentChange)}}>{percentChange}%</td>
              </tr>
            </tbody>
          </table>
        </Item>
        <Item>
        <Typography>Assets</Typography>
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th scope='col'>Asset</th>
              <th scope='col'>Type</th>
              <th scope='col'>Quantity Owned</th>
              <th scope='col'>Purchase Value</th>
              <th scope='col'>Current Value</th>
              <th scope='col'>Change</th>
            </tr>
          </thead>
          <tbody>
            {userAssets?.assets?.assets.map((asset, index) => (
              <tr key={asset.symbol}>
                <td>{asset.name+' ('+asset.symbol.toUpperCase()+')'}</td>
                <td>{asset.type}</td>
                <td>{asset.quantity}</td>
                <td>{currencyFormat(asset.value)}</td>
                <td>{currencyFormat(userValues?.prices[index]*asset.quantity)}</td>
                <td style={{color: (userValues?.prices[index]*asset.quantity-asset.value) > 0 ? 'green' : 'red'}}>
                  {currencyChangeFormat(userValues?.prices[index]*asset.quantity-asset.value)}
                </td>
                <td>
                  <SellAssetModal asset={asset} price={userValues?.prices[index]}/>
                </td>
              </tr>
            ))}
          </tbody>
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