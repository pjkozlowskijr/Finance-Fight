// //////////////////////////////
// USER PROFILE
// //////////////////////////////

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../forms/ProfileForm';
import { changeColor, currencyChangeFormat, currencyFormat, formatChange } from '../helpers';
import useGetUserAssets from '../hooks/useGetUserAssets';
import useGetUserAssetValues from '../hooks/useGetUserAssetValues';
import useGetUserInfo from '../hooks/useGetUserInfo';
import SellAssetModal from './SellAssetModal';
import { useTheme } from '@mui/material/styles';
import ProfilePurchaseModal from './ProfilePurchaseModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  backgroundImage:'none',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProfileStack() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Gets current user's assets
  const userAssets = useGetUserAssets()
  console.log(userAssets)
  
  // Gets current user's most recent info (bank, #holdings, etc.)
  const user = useGetUserInfo()
  
  // Gets current user's assets current values as of page load
  const userValues = useGetUserAssetValues()
  const dollarChange = formatChange(userValues?.total_value - userAssets?.assets?.total_cost)
  const percentChange = formatChange((dollarChange/userAssets?.assets?.total_cost)*100)

  if (!userAssets ?? !user ?? !userValues){
    return(
        <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress/>
        </Box>
    )
  }

  return (
    <Box sx={{ width:'80%', margin:'auto', mt:'-64px'}}>
      <Stack spacing={5} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Item sx={{width:'100%', p:2}}>
          <Typography sx={{fontWeight:'bold', color:'black', mb:3}} variant='h3'>
            {user?.first_name+' '+user?.last_name+' ('+user?.display_name+')'}
          </Typography>
          <table style={{width:'100%'}}>
            <thead>
              <tr className='profile-head'>
                <th scope='col'>Cash Funds</th>
                <th scope='col'>Total Asset Costs</th>
                <th scope='col'>Total Asset Value</th>
                <th scope='col'>Dollar Change</th>
                <th scope='col'>Percent Change</th>
              </tr>
            </thead>
            <tbody>
              <tr id='user-summary'>
                <td>{currencyFormat(user?.bank)}</td>
                <td>{currencyFormat(userAssets?.assets?.total_cost)}</td>
                <td>{currencyFormat(userValues?.total_value)}</td>
                <td style={{color:changeColor(dollarChange)}}>{currencyFormat(dollarChange)}</td>
                <td style={{color:changeColor(percentChange)}}>{percentChange}%</td>
              </tr>
            </tbody>
          </table>
        </Item>
        <Item sx={{width:'100%', p:2}}>
        <Typography sx={{fontWeight:'bold', color:'black', mb:3}} variant='h3'>
          {user?.first_name}'s Assets
        </Typography>
        <table style={{width:'100%'}}>
          <thead>
            <tr className='profile-head'>
              <th scope='col'>Asset</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Total Purchase</th>
              <th scope='col'>Current Value</th>
              <th scope='col'>$ Change</th>
              <th scope='col'>% Change</th>
            </tr>
          </thead>
          <tbody>
            {userAssets?.assets?.assets.map((asset, index) => (
              <tr key={asset.symbol} className='user-assets'>
                <td className='asset-name'>
                  <Button 
                    sx={{
                        width:'80%', 
                        fontWeight:'bold', 
                        whiteSpace:'nowrap',
                    }} 
                    variant='contained'
                    onClick={()=>(navigate('/asset/'+asset.type.toLowerCase()+'/'+asset.symbol.toLowerCase()))}
                  >
                    {asset.symbol.toUpperCase()}
                  </Button>
                </td>
                <td>{asset.quantity}</td>
                <td>
                  {currencyFormat(asset.value)}
                </td>
                <td>
                  {currencyFormat(userValues?.prices[index]*asset.quantity)}
                </td>
                <td style={{
                  color: (userValues?.prices[index]*asset.quantity-asset.value) > 0 ? 'green' : 'red'
                  }}
                >
                  {currencyChangeFormat(userValues?.prices[index]*asset.quantity-asset.value)}
                </td>
                <td style={{
                  color: ((userValues?.prices[index]*asset.quantity - asset.value)/asset.value*100) > 0 ? 'green' : 'red'
                  }}
                >
                  {formatChange((userValues?.prices[index]*asset.quantity - asset.value)/asset.value*100)}
                </td>
                <td>
                  <ProfilePurchaseModal asset={asset} price={userValues?.prices[index]}/>
                </td>
                <td>
                  <SellAssetModal asset={asset} price={userValues?.prices[index]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Item>
        <Item sx={{width:'70%', p:5}}>
            <Typography variant='h3' sx={{fontWeight:'bold', color:'black', textAlign:'left', mb:2}}>Edit Profile</Typography>
            <ProfileForm user={user}/>
        </Item>
      </Stack>
    </Box>
  );
}