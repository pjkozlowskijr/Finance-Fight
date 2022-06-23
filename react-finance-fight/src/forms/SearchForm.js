// //////////////////////////////
// ASSET SEARCH FORM
// //////////////////////////////

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { AppContext } from '../context/AppContext';
import useAssetInfo from '../hooks/useAssetInfo';

const FormSchema = Yup.object({
    symbol: Yup.string().required(),
    });

const initialValues={
    symbol: '',
};

export default function SearchForm(){
    const theme = useTheme();

    // Set asset type for search
    const {assetType, setAssetType} = useContext(AppContext);
    const handleChange = (event) => {
        setAssetType(event.target.value)
    };
    
    // Set asset symbol for search
    const {symbol, setSymbol} = useContext(AppContext);
    const handleSubmit = (values, resetForm) => {
        setSymbol(values.symbol.toLowerCase())
        resetForm(initialValues)
    };

    useAssetInfo(assetType, symbol);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    });

    return(
        <Box sx={{width:'60%', m:'auto'}}>
            <FormControl sx={{mb:1}}>
                <Box sx={{display:'flex'}}>
                    <FormLabel 
                        id="asset-type" 
                        sx={{
                            display:'inline-flex', 
                            alignItems:'center', 
                            lineHeight:1.5, 
                            mr:3,
                            fontSize: '1.25em'
                        }}
                    >
                        Asset Type:
                    </FormLabel>
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
            <Typography sx={{color: theme?.palette.secondary.main}}>
                Note: Only TICKER SYMBOLS are accepted in search. For example, enter "AMZN" to search Amazon.
            </Typography>
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
                <Button 
                    type='submit' 
                    sx={{width:'100%', fontWeight:'bold'}} 
                    variant='contained'
                >
                    Search
                </Button>
            </form>
        </Box>
    )
}