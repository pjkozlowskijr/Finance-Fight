import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import useGetAllUsers from '../hooks/useGetAllUsers'

export default function UserLeaderboard() {
  const users = useGetAllUsers()

  return (
    <Box>
      {users?.users?.map(user => (
        <Typography>
          {user.bank}
        </Typography>
      ))}
    </Box>
  )
}
