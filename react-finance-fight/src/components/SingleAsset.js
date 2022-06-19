import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toTitleCase } from '../helpers';
import TradingChart from './TradingChart';
import SearchForm from '../forms/SearchForm';
import Grid from '@mui/material/Grid';
import { currencyFormat, shortenMktCap, formatChange, formatRegNumber } from '../helpers';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PurchaseAssetModal from './PurchaseAssetModal';
import Link from '@mui/material/Link';

// const aapl = {
//     change_dollar: 1.8200073,
//     change_percent: 1.3993598,
//     day_high: 133.079,
//     day_low: 129.81,
//     industry: "Technology",
//     logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
//     market_cap: 2134504243200,
//     name: "Apple Inc.",
//     open: 130.065,
//     previous_close: 130.06,
//     price: 131.88,
//     price_avg_50: 152.4732,
//     price_avg_200: 159.03204,
//     symbol: "AAPL",
//     volume: 79623355,
//     volume_avg: 95890431,
//     website: "https://www.apple.com/",
//     year_high: 182.94,
//     year_low: 129.04
// }

export default function SingleAsset({asset}){
    const changeColor = (formatChange(asset.change_dollar).startsWith('+')) ? 'green' : 'red'

    return(
        <Grid container>
            <Grid item md={12} sx={{display:'flex', justifyContent:'space-around'}}>
                <Typography>
                    {asset.name+' ('+asset.symbol+')'}
                </Typography>
                <Typography sx={{textAlign: 'center'}}>
                    <span>{currencyFormat(asset.price)}</span>
                    <span style={{color:changeColor}}>{' '+formatChange(asset.change_dollar)}</span>
                    <span style={{color:changeColor}}>{' ('+formatChange(asset.change_percent)+'%)'}</span>
                </Typography>
                <Typography id='asset_link' sx={{textAlign: 'center'}}>
                    <Link href={asset.website} underline='none' target='_blank' color='inherit'>
                        Website: {asset.website}
                    </Link>
                </Typography>
                <PurchaseAssetModal asset={asset}/>
            </Grid>
            <Grid item md={6}>
                <Grid container>

                    {/* 
                    Chose not to map the following grid items out because they come from
                    a dictionary containig other items used in a separate part of this page. 
                    Did not want to duplicate information.
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