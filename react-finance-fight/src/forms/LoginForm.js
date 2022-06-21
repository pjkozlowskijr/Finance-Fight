import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import Error from '../components/Error';
import { AppContext } from '../context/AppContext';
import useLogin from '../hooks/useLogin';

// //////////////////////////////
// LOGIN FORM
// //////////////////////////////

const FormSchema = Yup.object({
    email: Yup.string().email('Must be a valid email format.').required(),
    password: Yup.string().required()
    })

const initialValues={
    email: '',
    password: ''
}

export default function LoginForm(){
    const {setUserInfo} = useContext(AppContext)
    const [loginCreds, setLoginCreds] = useState({})
    const [error, setError] = useState('')
    
    useLogin(loginCreds, setLoginCreds, setError, setUserInfo)
    
    const handleSubmit = (values, resetForm) => {
        setLoginCreds(values)
        resetForm(initialValues)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'email'
                name = 'email'
                fullWidth
                sx={{mb:2, mt:2}}
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
                fullWidth
                sx={{mb:2, mt:2}}
                label = 'Password'
                placeholder = 'Password'
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
            />
            <Button type='submit' sx={{width:'100%', fontWeight:'bold'}} variant='contained'>Login</Button>
            <Error>{error}</Error>
        </form>
    )
}