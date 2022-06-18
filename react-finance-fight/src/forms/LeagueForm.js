import * as Yup from 'yup';
import { useState, useContext } from 'react';
import useCreateLeague from '../hooks/useCreateLeague'
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AppContext } from '../context/AppContext';
import moment from 'moment';

// //////////////////////////////
// LEAGUE FORM
// //////////////////////////////

export default function LeagueForm(){
    let dayPlusOne = new Date()
    dayPlusOne = dayPlusOne.setDate(dayPlusOne.getDate()+1)
    dayPlusOne = moment(dayPlusOne).format('MM/DD/YYYY')
    const FormSchema = Yup.object(
        {name: Yup.string().required()}
    )
    const initialValues = {name:''}
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    })
    
    const [start_date, setLeagueStart] = useState(dayPlusOne)
    const {name, setLeagueName} = useContext(AppContext)

    useCreateLeague({start_date, name})

    const handleSubmit = (values, resetForm) => {
        setLeagueName(values.name)
        resetForm(initialValues)
        console.log(name)
    }

    const handleChange = (newValue) => {
        setLeagueStart(moment(newValue).format('MM/DD/YYYY'))
        console.log(start_date)
    }

    return(
        <>
        <form onSubmit={formik.handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Select League Start"
        value={start_date}
        minDate={new Date(dayPlusOne)}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        <TextField
            id = 'name'
            name = 'name'
            fullWidth
            sx={{mb:2, mt:2}}
            label = 'League Name'
            placeholder= 'League Name'
            value = {formik.values.name}
            onChange = {formik.handleChange}
            error = {formik.touched.name && Boolean(formik.errors.name)}
            helperText = {formik.touched.name && formik.errors.name}
            />
        <Button 
            type='submit' 
            sx={{width:'100%', fontWeight:'bold', mb:2}} 
            variant='contained'
            >
            Create League
        </Button>
    </form>
        </>
    )
}