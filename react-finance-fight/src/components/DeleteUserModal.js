// //////////////////////////////
// POP UP MODAL FOR DELETE USER
// //////////////////////////////

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningIcon from '@mui/icons-material/Warning';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import useDeleteUser from '../hooks/useDeleteUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  height: '40vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  }

export default function DeleteUserModal() {
  const theme = useTheme()

  // For opening and closing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Set info for useDeleteUser hook based on submit
  const [deleteUser, setDeleteUser] = useState({});
  const handleDelete = () => {setDeleteUser({key:'value'})};
  useDeleteUser(deleteUser);

  return (
    <div>
      <Button 
        color='error'
        variant='contained' 
        sx={{
          width:'100%', 
          fontWeight:'bold', 
          mt:2, 
          backgroundColor:theme.palette.secondary.main,
          '&:hover': {
            backgroundColor:theme.palette.secondary.dark,
          },
        }} 
        startIcon={<DeleteForeverIcon/>} 
        onClick={handleOpen}
      >
        Delete Account
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-user-modal"
        sx={{backgroundColor:'rgba(0, 0, 0, 0.75)'}}
      >
        <Box sx={style}>
            <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold'}}>
                <WarningIcon/> WARNING <WarningIcon/>
            </Typography>
            <Typography variant='h6'>
                This action cannot be undone. Click outside this warning to go back. Click "Delete Profile" to permanently delete your account.
            </Typography>
            <Button 
                color='error' 
                onClick={() => {handleDelete()}} 
                sx={{width:'100%', fontWeight:'bold'}} 
                variant='contained'
                startIcon={<DeleteForeverIcon/>} 
            >
                Delete Account
            </Button>
        </Box>
      </Modal>
    </div>
  );
}

