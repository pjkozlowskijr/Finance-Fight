// //////////////////////////////
// PROFILE FORM (register & edit)
// //////////////////////////////

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DeleteUserModal from '../components/DeleteUserModal';
import { toTitleCase } from '../helpers';
import useCreateUser from '../hooks/useCreateUser';
import useEditUser from '../hooks/useEditUser';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ProfileForm({user}){
    const theme = useTheme()
    const navigate = useNavigate()

    // Creating a user
    const [createUser, setCreateUser] = useState({});
    useCreateUser(createUser);
    
    // Editing a user
    const [editUser, setEditUser] = useState({});
    useEditUser(editUser);
    
    // Submit handles create or edit user depending on user.token
    const handleSubmit = (values, resetForm) => {
        if (user?.token){
            setEditUser({...values, key:'value'})
        }else{
            setCreateUser(values)
        }
        resetForm(initialValues)
    };

    // Show/hide password icon
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const FormSchema = Yup.object(
        {
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            display_name: Yup.string().required(),
            email: Yup.string().email('Must be a valid email format.').required(),
            password: Yup.string().required(),
            confirm_pass: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match.')
        }
    );
    
    const initialValues = {
        first_name: (user?.first_name) ? toTitleCase(user?.first_name) : '',
        last_name: (user?.last_name) ? toTitleCase(user?.last_name) : '',
        display_name: user?.display_name ?? '',
        email: user?.email ?? '',
        password: '',
        confirm_pass: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, {resetForm}) => {handleSubmit(values, resetForm)},
        enableReinitialize: true
    });

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = 'first_name'
                name = 'first_name'
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'First Name'
                placeholder= 'First Name'
                value = {formik.values.first_name}
                onChange = {formik.handleChange}
                error = {formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText = {formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
                id = 'last_name'
                name = 'last_name'
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Last Name'
                placeholder= 'Last Name'
                value = {formik.values.last_name}
                onChange = {formik.handleChange}
                error = {formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText = {formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
                id = 'display_name'
                name = 'display_name'
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Display Name'
                placeholder= 'Display Name'
                value = {formik.values.display_name}
                onChange = {formik.handleChange}
                error = {formik.touched.display_name && Boolean(formik.errors.display_name)}
                helperText = {formik.touched.display_name && formik.errors.display_name}
            />
            <TextField
                id = 'email'
                name = 'email'
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Email'
                placeholder= 'Email'
                value = {formik.values.email}
                onChange = {formik.handleChange}
                error = {formik.touched.email && Boolean(formik.errors.email)}
                helperText = {formik.touched.email && formik.errors.email}
            />
            <TextField
                id = 'password'
                name = 'password'
                type = {showPassword ? 'text': 'password'}
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Password'
                placeholder= 'Password'
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
                InputProps = {{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton tabIndex='-1' onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
                                
            <TextField
                id = 'confirm_pass'
                name = 'confirm_pass'
                type = {showPassword ? 'text': 'password'}
                size = 'small'
                fullWidth
                sx={{mb:1, mt:1}}
                label = 'Confirm Password'
                placeholder= 'Confirm Password'
                value = {formik.values.confirm_pass}
                onChange = {formik.handleChange}
                error = {formik.touched.confirm_pass && Boolean(formik.errors.confirm_pass)}
                helperText = {formik.touched.confirm_pass && formik.errors.confirm_pass}
                InputProps = {{
                    endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton tabIndex='-1' onClick={handleShowPassword}>
                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            <Button 
                type='submit' 
                sx={{width:'100%', fontWeight:'bold', mt:2}} 
                variant='contained'
            >
                {user?.token ? 'Edit Profile' : 'Create Account'}
            </Button>
            {user?.token ?
                <DeleteUserModal/>
                :
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
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
            }
        </form>
    )
}