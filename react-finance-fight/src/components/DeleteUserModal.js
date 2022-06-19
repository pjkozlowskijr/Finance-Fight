import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AppContext } from '../context/AppContext';
import useDeleteUser from '../hooks/useDeleteUser';
import { useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user} = React.useContext(AppContext)
  const [deleteUser, setDeleteUser] = useState({})

  useDeleteUser(deleteUser)

  const handleDelete = () => {
    setDeleteUser({key:'value'})
}

  return (
    <div>
      <Button 
        color='error'
        variant='contained' 
        sx={{width:'100%', fontWeight:'bold'}} 
        startIcon={<DeleteForeverIcon/>} 
        onClick={handleOpen}
      >
        Delete Account
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backgroundColor:'rgba(0, 0, 0, 0.75)'}}
      >
        <Box sx={style}>
            <Typography variant='h4' sx={{textAlign:'center'}}>
                <WarningIcon/> WARNING <WarningIcon/>
            </Typography>
            <Typography>
                This action cannot be undone. Click outside of this warning to go back. Click "Delete Profile" to permanently delete your account.
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

