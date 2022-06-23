// //////////////////////////////
// REGISTER
// //////////////////////////////

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ProfileForm from '../forms/ProfileForm';

export default function Login() {
  return (
    <Paper sx={{width:'50vw', p:2, m:'auto', mt:5}}>
        <Typography variant='h3' sx={{fontWeight:'bold'}}>Register</Typography>
        <ProfileForm/>
    </Paper>
  )
} 