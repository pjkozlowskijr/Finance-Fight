import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import QuantitySlider from './QuantitySlider';
import { AppContext } from '../context/AppContext';
import { currencyFormat } from '../helpers';
import { Grid } from '@mui/material';
import { useState, useContext } from 'react';
import SellIcon from '@mui/icons-material/Sell';
import useSellAsset from '../hooks/useSellAsset';

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

export default function SellAssetModal({asset, price, userAssets}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {user, quantity,setAlert} = useContext(AppContext)
  const [sale, setSale] = useState();

  useSellAsset(sale)
  const handleSellAsset = (value) => {
    if (quantity <= asset.quantity){
        setSale({type:asset.type.toLowerCase(), symbol:asset.symbol, quantity:quantity, data:{...value}})
        console.log(sale)
    }else{
        setAlert({msg: "You can't sell what you don't own. Quantity selected is above your current holdings.", cat: 'error'})
    }
  }

  return (
    <div>
      <Button variant='contained' startIcon={<SellIcon/>} onClick={handleOpen}>Sell</Button>
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
                        Sell {asset?.symbol.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <QuantitySlider/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Market Price
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(price)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Net (Qty x Price)
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(price*quantity)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Current Funds
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(user?.bank)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right'}}>
                        Funds After Sale
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(parseFloat(user?.bank) + (price*quantity))}
                    </Typography>
                </Grid>
                <Grid item md={12} sx={{display:'flex'}}>
                    <Button
                        variant='contained'
                        startIcon={<SellIcon/>}
                        onClick={() => handleSellAsset({key:'value'})}
                        sx={{margin:'auto'}}
                        >
                        Confirm Sale
                    </Button>
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

