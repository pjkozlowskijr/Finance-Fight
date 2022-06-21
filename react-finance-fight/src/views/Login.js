import React from 'react'
import LoginForm from '../forms/LoginForm'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Login() {
  return (
    <Paper sx={{width:'50vw', p:2, m:'auto', mt:5}}>
        <Typography variant='h3' sx={{fontWeight:'bold'}}>Login</Typography>
        <LoginForm/>
    </Paper>
  )
} 