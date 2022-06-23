// //////////////////////////////
// USER PROFILE
// //////////////////////////////

import ProfileStack from '../components/ProfileStack';
import DataAcknowledgements from '../components/DataAcknowledgements';
import Box from '@mui/material/Box';

export default function Profile() {
  return (
    <>
    <ProfileStack/>
    <Box sx={{marginTop:'-7vh'}}>
      <DataAcknowledgements/>
    </Box>
    </>
  )
}
