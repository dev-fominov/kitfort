import { Form, Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../bll/hooks'
import { registerTC } from '../../bll/registerReducer'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid';
import { Avatar, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { PATH } from './Pages';


const initialValues = { email: '', password: '', password2: '' }
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email format')
		.required('Required'),
	password: Yup.string()
		.min(7, 'Password must be more than 7 characters...')
		.required('Required'),
	password2: Yup.string()
		.oneOf([Yup.ref('password'), ''], 'Password must match')
		.min(7, 'Password must be more than 7 characters...')
		.required('Required'),
})

export const Register = () => {
	const dispatch = useAppDispatch()
	const isRegisterIn = useAppSelector(state => state.register.isRegisterIn)
	if (isRegisterIn) {
		return <Navigate to={PATH.LOGIN} />
	}

	const paperStyle = { padding: 30, height: '500px', width: 400, margin: '40px auto' }
	const avatarStyle = { backgroundColor: '#9c2424' }
	const btStyle = { marginTop: '70px', borderRadius: '30px' }


	const onSubmit = (values: RegisterValueType) => {
		console.log(values)
		const regEmail = values.email
		const regPassword = values.password
		dispatch(registerTC(regEmail, regPassword))
	}
	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid container
					direction="column"
					justifyContent="center"
					alignItems="center">
					<Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
					<h2>Sign Up</h2>
				</Grid>
				<div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ values, getFieldProps, errors, touched, isSubmitting }) => (
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
											type='password'
											variant="standard"
											label="Password"
											placeholder={'Enter password'}
											fullWidth
											required
											helperText={touched.password && errors.password}
											{...getFieldProps("password")} />
										<TextField error={touched.password2 && !!errors.password2}
											type='password'
											variant="standard"
											label="Confirm password"
											placeholder={'Enter password'}
											fullWidth
											required
											helperText={touched.password2 && errors.password2}
											{...getFieldProps("password2")} />

										<Button type={'submit'}
											disabled={isSubmitting}
											variant={'contained'}
											color={'primary'}
											style={btStyle}
											fullWidth>Register</Button>
									</FormGroup>
								</FormControl>
							</Form>
						)
						}
					</Formik>
				</div>
			</Paper>
		</Grid>
	)
}

export type RegisterValueType = {
	email: string
	password: string
}