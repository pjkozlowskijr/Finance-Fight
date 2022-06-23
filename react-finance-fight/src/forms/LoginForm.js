// //////////////////////////////
// LOGIN FORM
// //////////////////////////////

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Error from '../components/Error';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const FormSchema = Yup.object({
    email: Yup.string().email('Must be a valid email format.').required(),
    password: Yup.string().required()
    })

const initialValues={
    email: '',
    password: ''
}

export default function LoginForm(){
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()

    // Setting login credentials for useLogin hook
    const [loginCreds, setLoginCreds] = useState({})
    const handleSubmit = (values, resetForm) => {
        setLoginCreds(values)
        resetForm(initialValues)
    }
    
    useLogin(loginCreds, setLoginCreds, setError);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    })

    // Show/hide password icon
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'email'
                name = 'email'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Email'
                placeholder = 'Email'
                value = {formik.values.email}
                onChange = {formik.handleChange}
                error = {formik.touched.email && Boolean(formik.errors.email)}
                helperText = {formik.touched.email && formik.errors.email}
            />
            <TextField
                id = 'password'
                name = 'password'
                type = {showPassword ? 'text': 'password'}
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Password'
                placeholder = 'Password'
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
                InputProps = {{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            <Button 
                type='submit' 
                sx={{
                    width:'100%', 
                    fontWeight:'bold',
                    mt:1,
                }} 
                variant='contained'
            >
                Login
            </Button>
            <Button 
                sx={{
                    width:'100%', 
                    fontWeight:'bold', 
                    mt:2, 
                    backgroundColor:theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor:theme.palette.secondary.dark,
                    },
                }} 
                variant='contained' 
                onClick={() => navigate('/register')}
            >
                Create Account
            </Button>
            <Error>{error}</Error>
        </form>
    )
}