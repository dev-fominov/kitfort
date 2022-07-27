import { Form, Formik, FormikProps } from 'formik'
import { useAppDispatch, useAppSelector } from '../../bll/hooks'
import { registerTC } from '../../bll/registerReducer'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid';
import { Avatar, Paper, Typography } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { PATH } from './Pages';
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const initialValues = { email: '', password: '', password2: '' }
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email format')
		.required('Required'),
	password: Yup.string()
		.min(8, 'Password must be more than 7 characters...')
		.required('Required'),
	password2: Yup.string()
		.oneOf([Yup.ref('password'), ''], 'Password must match')
		.min(8, 'Password must be more than 7 characters...')
		.required('Required'),
})

export const Register = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
	const status = useAppSelector(state => state.app.status)

	const [showPassword, setShowPassword] = useState<boolean>(false)

	
	console.log(isLoggedIn)
	const paperStyle = { padding: 30, height: '500px', width: 400, margin: '40px auto' }
	const btStyle = { marginTop: '70px', borderRadius: '30px' }
	const signUpTitleStyle = { textDecoration: 'none', marginTop: '30px', display: 'block' }

	const onSubmit = (values: RegisterValueType) => {
		// console.log(values)
		const regEmail = values.email
		const regPassword = values.password
		dispatch(registerTC(regEmail, regPassword))
	}

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	console.log(isLoggedIn)
	
	if (isLoggedIn) {
		return <Navigate to={PATH.PROFILE} />
	}

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid container
					direction="column"
					justifyContent="center"
					alignItems="center">
					<Avatar style={{backgroundColor: '#1976d2'}}><GroupAddIcon /></Avatar>
					<h2>Sign Up</h2>
				</Grid>
				<div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{(props: any & FormikProps<FormValues>) => {
							const { getFieldProps, errors, touched } = props
							// console.log(getFieldProps())
							return (
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
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												}}
											/>
											<TextField error={touched.password2 && !!errors.password2}
												type={showPassword ? 'text' : 'password'}
												variant="standard"
												label="Confirm password"
												placeholder={'Enter password'}
												fullWidth
												required
												helperText={touched.password2 && errors.password2}
												{...getFieldProps("password2")}
												InputProps={{
													endAdornment: <IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														edge="end"
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												}} />

											<Button type={'submit'}
												disabled={status === 'loading'}
												variant={'contained'}
												color={'primary'}
												style={btStyle}
												fullWidth>Register</Button>
										</FormGroup>
									</FormControl>
								</Form>
							)
						}}
					</Formik>
					<Grid container
						direction="column"
						justifyContent="center"
						alignItems="center">
						<Typography>
							<NavLink style={signUpTitleStyle} to={PATH.LOGIN}> Sign In</NavLink>
						</Typography>
					</Grid>
				</div>
			</Paper>
		</Grid>
	)
}

export type RegisterValueType = {
	email: string
	password: string
}

interface FormValues {
	email: string;
	password: string;
	password2: string;
}