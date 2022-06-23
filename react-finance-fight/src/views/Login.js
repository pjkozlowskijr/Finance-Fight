// //////////////////////////////
// LOGIN
// //////////////////////////////

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoginForm from '../forms/LoginForm';

export default function Login() {
  return (
    <Paper sx={{width:'50vw', p:5, m:'auto', mt:0}}>
        <Typography variant='h3' sx={{fontWeight:'bold', mb:2}}>Login</Typography>
        <LoginForm/>
    </Paper>
  )
} 