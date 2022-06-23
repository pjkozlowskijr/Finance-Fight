// //////////////////////////////
// POP UP MODAL FOR SELL ASSET
// //////////////////////////////

import SellIcon from '@mui/icons-material/Sell';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { currencyFormat } from '../helpers';
import useSellAsset from '../hooks/useSellAsset';
import QuantitySlider from './QuantitySlider';
import { useTheme } from '@mui/material/styles';

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

export default function SellAssetModal({asset, price}) {
  const {user, quantity, setAlert} = useContext(AppContext);
  const theme = useTheme();

  // Set modal open/close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Set info for useSellAsset hook 
  const [sale, setSale] = useState();
  const handleSellAsset = (value) => {
      // If the quantity trying to sell is less than what user has, setAlert and don't proceed
      if (quantity <= asset.quantity){
          setSale({type:asset.type.toLowerCase(), symbol:asset.symbol, quantity:quantity, data:{...value}})
        }else{
          setAlert({msg: "You can't sell what you don't own. Quantity selected is above your current holdings.", cat: 'error'})
        }
    };
    
  useSellAsset(sale);

  return (
    <div>
      <Button 
        variant='contained' 
        sx={{
            py:0.5, 
            my:2, 
            backgroundColor:theme.palette.secondary.main,           
            '&:hover': {
                backgroundColor:theme.palette.secondary.dark,
            }, 
            width:'5vw'
        }} 
        startIcon={<SellIcon/>} 
        onClick={handleOpen}
      >
        Sell
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="sell-asset-modal"
        sx={{backgroundColor:'rgba(0, 0, 0, 0.75)'}}
      >
        <Box sx={style}>
            <Grid container spacing={2} columnSpacing={5}>
                <Grid item md={12}>
                    <Typography variant="h3" component="h2" sx={{textAlign:'center'}}>
                        Sell {asset?.symbol.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <QuantitySlider/>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Market Price
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(price)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Net (Qty x Price)
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(price*quantity)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
                        Current Funds
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2">
                        {currencyFormat(user?.bank)}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6" component="h2" sx={{textAlign:'right', fontWeight:'bold'}}>
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

