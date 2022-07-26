import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Avatar, Paper, Typography} from "@mui/material";
import {PATH} from "./Pages";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../bll/hooks";
import {Form, Formik, FormikErrors} from 'formik'
// import { resetPasswordTC } from "../../bll/resetPasswordReducer";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import {newPasswordTC} from '../../bll/registerReducer';
import * as Yup from 'yup'

interface FormValues {
    password: string
}

const initialValues = {password: ''}
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be more than 7 characters...')
        .required('Required'),
})

export const NewPassword = () => {
    const paperStyle = {padding: 30, height: '500px', width: 400, margin: '40px auto'}
    const avatarStyle = {backgroundColor: '#9c2424'}
    const btStyle = {marginTop: '70px', borderRadius: '30px'}
    const textStyle = {marginTop: '30px', color: '#707070'}

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    const onSubmit = (values: FormValues) => {
        const newPassword = values.password
        const resetPasswordToken = ''
        dispatch(newPasswordTC(newPassword, resetPasswordToken))
    }

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
                <h2>Create new password</h2>
            </Grid>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({values, getFieldProps, errors, touched, isSubmitting}) => (
                    <Form>
                        <FormControl fullWidth>
                            <FormGroup>
                                <TextField error={touched.password && !!errors.password}
                                           variant="standard"
                                           label="Password"
                                           placeholder={'Enter new password'}
                                           fullWidth
                                           required
                                           helperText={touched.password && errors.password}
                                           {...getFieldProps("email")} />
                                <Grid container
                                      direction="column"
                                      justifyContent="center"
                                      alignItems="center">
                                    <Typography style={textStyle}>Create new password and we will send you further
                                        instructions to email</Typography>
                                </Grid>
                                <Button type={'submit'}
                                        disabled={status === 'loading'}
                                        variant={'contained'}
                                        color={'primary'}
                                        style={btStyle}
                                        fullWidth>Create new password</Button>
                            </FormGroup>
                        </FormControl>
                    </Form>
                )}
            </Formik>

        </Paper>
    </Grid>
}