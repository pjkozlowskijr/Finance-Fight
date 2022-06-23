// ///////////////////////////////////////////
// POP UP MODAL FOR ASSET PURCHASE IN SEARCH
// ///////////////////////////////////////////

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QuantitySlider from './QuantitySlider';
import { AppContext } from '../context/AppContext';
import { currencyFormat } from '../helpers';
import usePurchaseAsset from '../hooks/usePurchaseAsset';
import { useState, useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35vw',
  height: '65vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SearchPurchaseModal({asset}) {
  const {user, assetType, quantity, setAlert} = useContext(AppContext);

  // Set modal open/close
  const [open, setOpen] = useState(false);
  const handleOpen = () => (user?.token) ? setOpen(true) : setAlert({msg: 'Please login to purchase an asset.', cat: 'error'});
  const handleClose = () => setOpen(false);

  // Set info for usePurchaseAsset hook on submit  
  const [purchase, setPurchase] = useState();
  const handlePurchaseAsset = (value) => {
      // If the cost of purchase is more than user funds, setAlert and don't proceed
      if (asset.price * quantity <= user.bank){
          setPurchase({type:assetType, quantity, data:{...asset, ...value}})
        }else{
          setAlert({msg: "You don't have enough funds to make this purchase.", cat: "error"})
        }
    };

  usePurchaseAsset(purchase);
    
  return (
    <div>
      <Button variant='contained' sx={{mt:0.6, width:'5vw'}} startIcon={<MonetizationOnIcon/>} onClick={handleOpen}>Buy</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="purchase-asset-modal"
        sx={{backgroundColor:'rgba(0, 0, 0, 0.75)'}}
      >
        <Box sx={style}>
            <Grid container spacing={2} columnSpacing={5}>
                <Grid item md={12}>
                    <Typography variant="h3" component="h2" sx={{textAlign:'center'}}>
                        Purchase {asset.symbol}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <QuantitySlider/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Purchase Price
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(asset.price)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Cost (Qty x Price)
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(asset.price*quantity)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Available Funds
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(user?.bank)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
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

