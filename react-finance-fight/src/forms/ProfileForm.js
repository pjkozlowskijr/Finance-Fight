// //////////////////////////////
// PROFILE FORM (register & edit)
// //////////////////////////////

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import DeleteUserModal from '../components/DeleteUserModal';
import { toTitleCase } from '../helpers';
import useCreateUser from '../hooks/useCreateUser';
import useEditUser from '../hooks/useEditUser';

export default function ProfileForm({user}){
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
                fullWidth
                sx={{mb:2, mt:2}}
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
                fullWidth
                sx={{mb:2, mt:2}}
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
                fullWidth
                sx={{mb:2, mt:2}}
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
                fullWidth
                sx={{mb:2, mt:2}}
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
                type = 'password'
                fullWidth
                sx={{mb:2, mt:2}}
                label = 'Password'
                placeholder= 'Password'
                value = {formik.values.password}
                onChange = {formik.handleChange}
                error = {formik.touched.password && Boolean(formik.errors.password)}
                helperText = {formik.touched.password && formik.errors.password}
            />
            <TextField
                id = 'confirm_pass'
                name = 'confirm_pass'
                type = 'password'
                fullWidth
                sx={{mb:2, mt:2}}
                label = 'Confirm Password'
                placeholder= 'Confirm Password'
                value = {formik.values.confirm_pass}
                onChange = {formik.handleChange}
                error = {formik.touched.confirm_pass && Boolean(formik.errors.confirm_pass)}
                helperText = {formik.touched.confirm_pass && formik.errors.confirm_pass}
            />
            <Button 
                type='submit' 
                sx={{width:'100%', fontWeight:'bold', mb:2}} 
                variant='contained'
            >
                {user?.token ? 'Edit Profile' : 'Register'}
            </Button>
            {user?.token ?
                <DeleteUserModal/>
                :
                ''
            }
        </form>
    )
}