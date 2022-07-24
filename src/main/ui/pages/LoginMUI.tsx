import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Avatar, Paper, Typography} from "@mui/material";
import {PATH} from "./Pages";
import {Navigate, NavLink} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../bll/store";
import {useAppSelector} from "../../bll/hooks";
import {loginTC} from "../../bll/authReducer";
import {Form, Formik, FormikErrors} from 'formik'


interface FormValues {
    email: string
    password: string
    rememberMe: boolean
}


export const LoginMUI = () => {
    const paperStyle = {padding: 30, height: '500px', width: 400, margin: '40px auto'}
    const avatarStyle = {backgroundColor: '#9c2424'}
    const btStyle = {marginTop: '70px', borderRadius: '30px'}
    const forgoPasswordTitleStyle = {textDecoration: 'none', color: 'black'}
    const signUpTitleStyle = {textDecoration: 'none'}
    const textStyle = {marginTop: '30px', color: '#707070'}

    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors: FormikErrors<FormValues> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required'}
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    dispatch(loginTC(values))
                    actions.setSubmitting(false)
                    actions.resetForm()
                }}
            >
                {({values, getFieldProps, errors, touched, isSubmitting}) => (
                    <Form>
                        <FormControl fullWidth>
                            <FormGroup>
                                <TextField error={touched.email && !!errors.email}
                                           variant="standard"
                                           label="Email"
                                           placeholder={'Enter email'}
                                           fullWidth
                                           required
                                           helperText={touched.email && errors.email}
                                           {...getFieldProps("email")}/>
                                <TextField error={touched.password && !!errors.password}
                                           type='password'
                                           variant="standard"
                                           label="Password"
                                           placeholder={'Enter password'}
                                           fullWidth
                                           required
                                           helperText={touched.password && errors.password}
                                           {...getFieldProps("password")}/>
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox {...getFieldProps("rememberMe")}
                                                                     checked={values.rememberMe}/>}/>
                                <Grid container justifyContent="flex-end">
                                    <Typography>
                                        <NavLink style={forgoPasswordTitleStyle} to={PATH.RESET_PASSWORD}>Forgot
                                            password?</NavLink>
                                    </Typography>
                                </Grid>
                                <Button type={'submit'}
                                        disabled={isSubmitting}
                                        variant={'contained'}
                                        color={'primary'}
                                        style={btStyle}
                                        fullWidth>Sign In</Button>
                            </FormGroup>
                        </FormControl>
                    </Form>
                )}
            </Formik>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Typography style={textStyle}>Don’t have an account?</Typography>
                <Typography>
                    <NavLink style={signUpTitleStyle} to={PATH.LOGOUT}> Sign Up</NavLink>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
}