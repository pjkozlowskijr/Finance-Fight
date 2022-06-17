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
import SearchForm from './SearchForm';
import Grid from '@mui/material/Grid';
import { currencyFormat, shortenMktCap, formatChange, formatRegNumber } from '../helpers';

const aapl = {
    change_dollar: 1.8200073,
    change_percent: 1.3993598,
    day_high: 133.079,
    day_low: 129.81,
    industry: "Technology",
    logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    market_cap: 2134504243200,
    name: "Apple Inc.",
    open: 130.065,
    previous_close: 130.06,
    price: 131.88,
    price_avg_50: 152.4732,
    price_avg_200: 159.03204,
    symbol: "AAPL",
    volume: 79623355,
    volume_avg: 95890431,
    website: "https://www.apple.com/",
    year_high: 182.94,
    year_low: 129.04
}

export default function SingleAsset({asset=aapl}){
    const changeColor = (formatChange(asset.change_dollar).startsWith('+')) ? 'green' : 'red'
    return(
        <Card sx={{width:'100%'}}>
            <CardContent>
                <Grid container>
                    <Grid item md={4}>
                        <Typography>
                            {asset.name+' ('+asset.symbol+')'}
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography sx={{textAlign: 'center'}}>
                            <span>{asset.price}</span>
                            <span style={{color:changeColor}}>{' '+formatChange(asset.change_dollar)}</span>
                            <span style={{color:changeColor}}>{' ('+formatChange(asset.change_percent)+'%)'}</span>
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography id='asset_link' sx={{textAlign: 'right'}}>
                            {asset.name+' Website: '+asset.website}
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Grid container>

                            {/* 
                            Chose not to map the following grid items out because they come from
                            a dictionary containig other items used in a separate part of this page. 
                            Did not want to duplicate information.
                             */}

                            <Grid item md={6}>
                                <Typography>
                                    Open: {currencyFormat(asset.open)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Industry: {asset.industry}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Previous Close: {currencyFormat(asset.previous_close)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Market Cap: {shortenMktCap(asset.market_cap)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Day's High: {currencyFormat(asset.day_high)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Volume: {formatRegNumber(asset.volume)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Day's Low: {currencyFormat(asset.day_low)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Avg. Volume: {formatRegNumber(asset.volume_avg)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Year's High: {currencyFormat(asset.year_high)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    50-Day Average: {currencyFormat(asset.price_avg_50)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    Year's Low: {currencyFormat(asset.year_low)}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>
                                    200-Day Average: {currencyFormat(asset.price_avg_200)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <TradingChart symbol={asset.symbol}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}