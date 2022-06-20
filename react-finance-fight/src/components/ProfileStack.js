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
import { toTitleCase, currencyFormat, formatChange, changeColor } from '../helpers';
import useGetUserInfo from '../hooks/useGetUserInfo';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProfileStack() {
    const userAssets = useGetUserAssets()
    const {user} = React.useContext(AppContext)
    const dollarChange = formatChange(user.bank-10000)
    const percentChange = formatChange((user.bank-10000)/10000*100)
    
    // useGetUserInfo()

  return (
    <Box sx={{ width:'80%', margin:'auto'}}>
      <Stack spacing={3} divider={<Divider/>}>
        <Item>
          <Typography sx={{textAlign:'left'}} variant='h4'>{toTitleCase(user.first_name)+' '+toTitleCase(user.last_name)+' ('+user.display_name+')'}</Typography>
          <Grid container>
            <Grid item md={3}>
              <Typography>Cash Funds: {currencyFormat(user.bank)}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Total Asset Costs: {currencyFormat(userAssets?.assets?.assets.map(asset=>asset.value).reduce((x,y)=>x+y))}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Dollar Change: <span style={{color:changeColor(dollarChange)}}>{currencyFormat(dollarChange)}</span></Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Percent Change: <span style={{color:changeColor(percentChange)}}>{percentChange}%</span></Typography>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container>
            <Grid item md={12}>
              <Typography>Assets</Typography>
            </Grid>
            {userAssets?.assets?.assets.map((asset) => (
              <>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    {toTitleCase(asset.name)+' ('+asset.symbol.toUpperCase()+')'}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    {toTitleCase(asset.type)}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    Quantity Owned: {asset.quantity}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    Purchase Value: {currencyFormat(asset.value)}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    Current Value: XXXXX
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography key={asset.symbol}>
                    Change: XXXXX
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Item>
        <Item>
            <Typography>Edit Profile</Typography>
            <ProfileForm user={user}/>
        </Item>
      </Stack>
    </Box>
  );
}
