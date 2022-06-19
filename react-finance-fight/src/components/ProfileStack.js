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
import { toTitleCase, currencyFormat, formatChange } from '../helpers';

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
    console.log(userAssets)

  return (
    <Box sx={{ width:'70%', margin:'auto'}}>
      <Stack spacing={3} divider={<Divider/>}>
        <Item>
          <Typography sx={{textAlign:'left'}} variant='h4'>{toTitleCase(user.first_name)+' '+toTitleCase(user.last_name)+' ('+user.display_name+')'}</Typography>
          <Grid container>
            <Grid item md={3}>
              <Typography>Starting Funds: $10,000.00</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Current Funds: {currencyFormat(user.bank)}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Dollar Change: {formatChange(user.bank-10000)}</Typography>
            </Grid>
            <Grid item md={3}>
              <Typography>Percent Change: {formatChange((user.bank-10000)/10000*100)}%</Typography>
            </Grid>
          </Grid>
        </Item>
        <Item>
            {userAssets?.assets?.assets.map((asset) => (
              <Typography>
                {asset.name}

              </Typography>
            ))}
        </Item>
        <Item>
            <Typography>Edit Profile</Typography>
            <ProfileForm user={user}/>
        </Item>
      </Stack>
    </Box>
  );
}
