import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import useAssetInfo from '../hooks/useAssetInfo';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// //////////////////////////////
// ASSET SEARCH FORM
// //////////////////////////////

const FormSchema = Yup.object({
    symbol: Yup.string().required(),
    })

const initialValues={
    symbol: '',
}

export default function SearchForm(){
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    })

    const {assetType, setAssetType} = useContext(AppContext)
    const {symbol, setSymbol} = useContext(AppContext)
    const theme = useTheme()
    
    useAssetInfo(assetType, symbol)
    
    const handleChange = (event) => {
        setAssetType(event.target.value)
    }
    
    const handleSubmit = (values, resetForm) => {
        setSymbol(values.symbol.toLowerCase())
        resetForm(initialValues)
    }

    return(
        <Box sx={{width:'60%', m:'auto'}}>
        <FormControl sx={{mb:1}}>
            <Box sx={{display:'flex'}}>
            <FormLabel id="asset-type" sx={{display:'inline-flex', alignItems:'center', lineHeight:1.5, mr:3}}>Asset Type:</FormLabel>
            <RadioGroup
                row
                aria-labelledby="asset-type"
                name="asset-type"
                value={assetType}
                onChange={handleChange}
                >
                <FormControlLabel 
                value={'stock'}
                control={<Radio/>} 
                label={'Stock'}
                />
                <FormControlLabel 
                value={'crypto'}
                control={<Radio/>} 
                label={'Cryptocurrency'}
                />
            </RadioGroup>
                </Box>
        </FormControl>
        <Typography sx={{color: theme?.palette.secondary.main}}>Note: Only TICKER SYMBOLS are accepted in search. For example, enter "AMZN" to search Amazon.</Typography>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'symbol'
                name = 'symbol'
                fullWidth
                sx={{mb:2}}
                label = 'Symbol'
                placeholder = 'Symbol'
                value = {formik.values.symbol}
                onChange = {formik.handleChange}
                error = {formik.touched.symbol && Boolean(formik.errors.symbol)}
                helperText = {formik.touched.symbol && formik.errors.symbol}
            />
            <Button type='submit' sx={{width:'100%', fontWeight:'bold'}} variant='contained'>Search</Button>
        </form>
        </Box>
    )
}