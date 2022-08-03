import {useState} from 'react'
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
import {useAppDispatch, useAppSelector} from "../../bll/hooks";
import {loginTC} from "../../bll/authReducer";
import {Form, Formik, FormikErrors} from 'formik'
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const paperStyle = {padding: 30, height: '500px', width: 400, margin: '40px auto'}
const btStyle = {marginTop: '70px', borderRadius: '30px'}
const forgoPasswordTitleStyle = {textDecoration: 'none'}
const signUpTitleStyle = {textDecoration: 'none'}
const textStyle = {marginTop: '30px', color: '#707070'}

interface FormValues {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginMUI = () => {

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const dispatch = useAppDispatch()
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
                <Avatar style={{backgroundColor: '#1976d2'}}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors: FormikErrors<FormValues> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (values.password.length < 7) {
                        errors.password = 'Minimum password length of 7 characters'
                    }
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
                                           {...getFieldProps("email")} />
                                <TextField error={touched.password && !!errors.password}
                                           type={showPassword ? 'text' : 'password'}
                                           variant="standard"
                                           label="Password"
                                           placeholder={'Enter password'}
                                           fullWidth
                                           required
                                           helperText={touched.password && errors.password}
                                           {...getFieldProps("password")}
                                           InputProps={{
                                               endAdornment: <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   edge="end"
                                               >
                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           }}
                                />
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
                                        disabled={status === 'loading'}
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
                    <NavLink style={signUpTitleStyle} to={PATH.REGISTER}> Sign Up</NavLink>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
}