// //////////////////////////////
// SINGLE ASSET DISPLAY
// //////////////////////////////

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { currencyFormat, shortenMktCap, formatChange, formatRegNumber } from '../helpers';
import PurchaseAssetModal from './PurchaseAssetModal';
import TradingChart from './TradingChart';

export default function SingleAsset({asset}){
    const changeColor = (formatChange(asset.change_dollar).startsWith('+')) ? 'green' : 'red';
    
    if (!asset){
        return(
            <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <CircularProgress/>
            </Box>
        )
    };

    return(
        <Grid container sx={{mt:5}}>
            <Grid item md={12} sx={{display:'flex', justifyContent:'space-around', mb:3}}>
                <PurchaseAssetModal asset={asset}/>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>
                    {asset.name+' ('+asset.symbol+')'}
                </Typography>
                <Typography variant='h4'>
                    <span>{currencyFormat(asset.price)}</span>
                    <span style={{color:changeColor}}>{' '+formatChange(asset.change_dollar)}</span>
                    <span style={{color:changeColor}}>{' ('+formatChange(asset.change_percent)+'%)'}</span>
                </Typography>
                <Typography id='asset_link' variant='h6' sx={{lineHeight:2}}>
                    <Link href={asset.website} underline='none' target='_blank' color='inherit'>
                        Website: {asset.website}
                    </Link>
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Grid container>

                    {/* 
                    Chose not to map the following grid items out because they come from
                    a dictionary containing items not used in this display.
                        */}

                    <Grid item md={3}>
                        <Typography>
                            Open
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.open)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Industry
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {asset.industry}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Previous Close
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.previous_close)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Market Cap
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {shortenMktCap(asset.market_cap)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Day's High
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.day_high)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Volume
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {formatRegNumber(asset.volume)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Day's Low
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.day_low)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Avg. Volume
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {formatRegNumber(asset.volume_avg)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Year's High
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.year_high)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            50-Day Average
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.price_avg_50)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            Year's Low
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.year_low)}
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            200-Day Average
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography>
                            {currencyFormat(asset.price_avg_200)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6}>
                <TradingChart symbol={asset.symbol}/>
            </Grid>
        </Grid>
    )
}