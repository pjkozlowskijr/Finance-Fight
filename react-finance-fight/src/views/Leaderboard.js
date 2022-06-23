// //////////////////////////////
// USER LEADERBOARD
// //////////////////////////////

import UserLeaderboard from '../components/UserLeaderboard';
import DataAcknowledgements from '../components/DataAcknowledgements';
import Box from '@mui/material/Box';

export default function Leaderboard() {
  return (
    <>
    <UserLeaderboard/>
    <Box sx={{marginTop:'-7vh'}}>
      <DataAcknowledgements/>
    </Box>
    </>
  )
}
