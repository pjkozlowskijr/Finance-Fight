import { Card, CardContent, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import useGetLeagues from '../hooks/useGetLeagues';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useGetUserLeagues from '../hooks/useGetUserLeagues';
import useJoinLeague from '../hooks/useJoinLeague';
import useLeaveLeague from '../hooks/useLeaveLeague'
import { AppContext } from '../context/AppContext';

export default function BrowseLeagues() {
    const leagues = useGetLeagues()
    const userLeagues = useGetUserLeagues()
    const [joinId, setJoinId] = useState()
    const [leaveId, setLeaveId] = useState()

    useJoinLeague(joinId)
    useLeaveLeague(leaveId)

    const handleJoinLeague = (id) => {
        setJoinId(id)
    }
    
    const handleLeaveLeague = (id) => {
        setLeaveId(id)
    }

    if (!leagues){
        return(
          <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress/>
          </Box>
        )
      }
    return (
        leagues?.leagues?.leagues.filter(league => new Date(league.league_start) > new Date()).map((league) => (
            <Card key={league.id}>
            <CardContent>
                <Typography>
                    {league.name}
                </Typography>
                {(userLeagues?.leagues?.leagues.map(x=>x.id).includes(league.id)) ?
                <Button 
                    variant='contained'
                    onClick={()=>{handleLeaveLeague(league.id)}}
                >
                    Leave
                </Button>
                :
                <Button 
                    variant='contained'
                    onClick={()=>{handleJoinLeague(league.id)}}
                >
                    Join
                </Button>
                }
                
            </CardContent>
            </Card>
        ))

    )
}
