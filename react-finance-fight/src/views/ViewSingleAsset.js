// //////////////////////////////
// SEARCH SINGLE ASSET DISPLAY
// //////////////////////////////

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SearchPurchaseModal from '../components/SearchPurchaseModal';
import TradingChart from '../components/TradingChart';
import { AppContext } from '../context/AppContext';
import { currencyFormat, formatChange, formatRegNumber, shortenMktCap } from '../helpers';
import useAssetInfo from '../hooks/useAssetInfo';
import Paper from '@mui/material/Paper';
import DataAcknowledgements from '../components/DataAcknowledgements';

const HeaderTypography = styled(Typography)({
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: 3,
    borderBottom: '1px solid black',
})

const DataTypography = styled(Typography)({
    fontSize: '20px',
    lineHeight: 3,
    borderBottom: '1px solid black',
    marginRight: '3vw'
})

export default function ViewSingleAsset(){
    const {type, symbol} = useParams()
    useAssetInfo(type, symbol)
    const {asset} = useContext(AppContext)
    console.log(asset)

    while (!asset){
        return(
            <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <CircularProgress/>
            </Box>
        )
    };
    
    const changeColor = (formatChange(asset.change_dollar).startsWith('+')) ? 'green' : 'red'

    return(
        <>
        <Paper sx={{p:2, mt:'-64px'}}>
            <Grid container sx={{mt:2}}>
                <Grid item md={12} sx={{display:'flex', justifyContent:'space-between', mb:5}}>
                    <Typography variant='h4' sx={{fontWeight:'bold'}}>
                        {asset.name+' ('+asset.symbol+')'}
                    </Typography>
                    <Typography variant='h4'>
                        <span>{currencyFormat(asset.price)}</span>
                        &nbsp;
                        <span style={{color:changeColor}}>{' '+formatChange(asset.change_dollar)}</span>
                        &nbsp;
                        <span style={{color:changeColor}}>{' ('+formatChange(asset.change_percent)+'%)'}</span>
                    </Typography>
                    <Typography variant='h4'>
                        <Link href={asset.website} target='_blank' color='inherit'>
                            Company Website
                        </Link>
                    </Typography>
                    <SearchPurchaseModal asset={asset}/>
                </Grid>
                <Grid item md={6}>
                    <Grid container>

                        {/* 
                        Chose not to map the following grid items out because they come from
                        a dictionary containing items not used in this display.
                    */}

                        <Grid item md={3}>
                            <HeaderTypography>
                                Open
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.open)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Industry
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {asset.industry}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Previous Close
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.previous_close)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Market Cap
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {shortenMktCap(asset.market_cap)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Day's High
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.day_high)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Volume
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {formatRegNumber(asset.volume)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Day's Low
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.day_low)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Avg. Volume
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {formatRegNumber(asset.volume_avg)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                Year's High
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.year_high)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography>
                                50-Day Average
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography>
                                {currencyFormat(asset.price_avg_50)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography sx={{borderBottom:'none'}}>
                                Year's Low
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography sx={{borderBottom:'none'}}>
                                {currencyFormat(asset.year_low)}
                            </DataTypography>
                        </Grid>
                        <Grid item md={3}>
                            <HeaderTypography sx={{borderBottom:'none'}}>
                                200-Day Average
                            </HeaderTypography>
                        </Grid>
                        <Grid item md={3}>
                            <DataTypography sx={{borderBottom:'none'}}>
                                {currencyFormat(asset.price_avg_200)}
                            </DataTypography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6}>
                    <TradingChart symbol={asset.symbol}/>
                </Grid>
            </Grid>
        </Paper>
        <Box sx={{marginTop:'-7vh'}}>
            <DataAcknowledgements/>
        </Box>
        </>
    )
}