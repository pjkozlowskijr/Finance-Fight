// //////////////////////////////
// REGISTER
// //////////////////////////////

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ProfileForm from '../forms/ProfileForm';

export default function Login() {
  return (
    <Paper sx={{width:'50vw', p:5, m:'auto', mt:'-64px'}}>
        <Typography variant='h3' sx={{fontWeight:'bold', mb:2}}>Create Account</Typography>
        <ProfileForm/>
    </Paper>
  )
} 