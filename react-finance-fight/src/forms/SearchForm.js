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

    const [assetType, setAssetType] = useState('stock')
    const {symbol, setSymbol} = useContext(AppContext)
    
    useAssetInfo(assetType, symbol)
    
    const handleChange = (event) => {
        setAssetType(event.target.value)
    }
    
    const handleSubmit = (values, resetForm) => {
        setSymbol(values.symbol)
        resetForm(initialValues)
    }

    return(
        <>
        <FormControl sx={{mb:2}}>
                <FormLabel id="asset-type">Asset Type:</FormLabel>
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
            </FormControl>
                <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'symbol'
                name = 'symbol'
                fullWidth
                sx={{mb:2, mt:2}}
                label = 'Symbol'
                placeholder = 'Symbol'
                value = {formik.values.symbol}
                onChange = {formik.handleChange}
                error = {formik.touched.symbol && Boolean(formik.errors.symbol)}
                helperText = {formik.touched.symbol && formik.errors.symbol}
            />
            <Button type='submit' sx={{width:'100%', fontWeight:'bold'}} variant='contained'>Search</Button>
        </form>
                </>
    )
}