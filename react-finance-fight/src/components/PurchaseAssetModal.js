import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QuantitySlider from './QuantitySlider';
import { AppContext } from '../context/AppContext';
import { currencyFormat } from '../helpers';
import { Grid } from '@mui/material';
import usePurchaseAsset from '../hooks/usePurchaseAsset'
import { useState, useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  height: '60vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PurchaseAssetModal({asset}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user, assetType, quantity} = useContext(AppContext);
  const [purchase, setPurchase] = useState();

  usePurchaseAsset(purchase)

  const handlePurchaseAsset = (value) => {
    setPurchase({type:assetType, quantity, data:{...asset, ...value}})
  }

  return (
    <div>
      <Button variant='contained' startIcon={<MonetizationOnIcon/>} onClick={handleOpen}>Purchase</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2} columnSpacing={5}>
                <Grid item md={12}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'center'}}>
                        Purchase {asset.symbol}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <QuantitySlider/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Purchase Price
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(asset.price)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Cost (Qty x Price)
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(asset.price*quantity)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Available Funds
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(user?.bank)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Funds After Purchase
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(user?.bank - (asset.price*quantity))}
                    </Typography>
                </Grid>
                <Grid item md={12} sx={{display:'flex'}}>
                    <Button
                        variant='contained'
                        startIcon={<MonetizationOnIcon/>}
                        onClick={() => handlePurchaseAsset({key:'value'})}
                        sx={{margin:'auto'}}
                        >
                        Confirm Purchase
                    </Button>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

