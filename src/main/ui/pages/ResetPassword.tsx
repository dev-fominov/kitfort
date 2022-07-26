import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Avatar, Paper, Typography} from "@mui/material";
import {PATH} from "./Pages";
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {useAppSelector} from "../../bll/hooks";
import {Form, Formik, FormikErrors} from 'formik'
import {resetPasswordTC} from "../../bll/resetPasswordReducer";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

interface FormValues {
    email: string
}

export const ResetPassword = () => {
    const paperStyle = {padding: 30, height: '500px', width: 400, margin: '40px auto'}
    const avatarStyle = {backgroundColor: '#9c2424'}
    const btStyle = {marginTop: '70px', borderRadius: '30px'}
    const loginTitleStyle = {textDecoration: 'none'}
    const textStyle = {marginTop: '30px', color: '#707070'}
    
    const dispatch = useDispatch<AppDispatchType>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Avatar style={avatarStyle}><QuestionMarkOutlinedIcon/></Avatar>
                <h2>Forgot your password?</h2>
            </Grid>
            <Formik
                initialValues={{email: ''}}
                validate={values => {
                    const errors: FormikErrors<FormValues> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    const email = values.email
                    dispatch(resetPasswordTC(email))
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
                                           {...getFieldProps("email")} />
                                <Grid container justifyContent="flex-start">
                                    <Typography style={textStyle}>
                                        Enter your email address and we will send you further instructions
                                    </Typography>
                                </Grid>
                                <Button type={'submit'}
                                        disabled={status === 'loading'}
                                        variant={'contained'}
                                        color={'primary'}
                                        style={btStyle}
                                        fullWidth>Send Instructions</Button>
                            </FormGroup>
                        </FormControl>
                    </Form>
                )}
            </Formik>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Typography style={textStyle}>Did you remember your password?</Typography>
                <Typography>
                    <NavLink style={loginTitleStyle} to={PATH.LOGIN}>Try logging in</NavLink>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
}