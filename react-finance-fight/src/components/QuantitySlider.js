import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 50px;
`;

export default function QuantitySlider({quantity, setQuantity}) {
  const handleSliderChange = (event, newValue) => {
    setQuantity(newValue);
  };

  const handleInputChange = (event) => {
    setQuantity(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (quantity < 0) {
      setQuantity(0);
    } else if (quantity > 100) {
      setQuantity(100);
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom variant='h6'>
        Quantity
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof quantity === 'number' ? quantity : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={0}
            max={100}
            size='large'
          />
        </Grid>
        <Grid item>
          <Input
            value={quantity}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
