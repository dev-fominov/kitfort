import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../../bll/hooks'
import { registerTC } from '../../bll/registerReducer'
import * as Yup from 'yup'

interface FormValues {
	email: string
	password: string
	password2: string
}

export type RegisterValueType = {
	email: string
	password: string
}



const initialValues = { email: '', password: '', password2: '' }
const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email format')
		.required('Required'),
	password: Yup.string()
		.required('Required'),
	password2: Yup.string()
		.oneOf([Yup.ref('password'), ''], 'Password must match')
		.required('Required'),
})



export const Register = () => {

	const dispatch = useAppDispatch()
	const onSubmit = (values: RegisterValueType) => {
		console.log(values)
		// const regEmail = values.email
		// const regPassword = values.password
		// dispatch(registerTC(regEmail, regPassword))
	}
	return (
		<div>
			<h2>Register</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched, isSubmitting }) => {
					console.log(errors)
					console.log(touched)
					console.log(isSubmitting)
					return (
						<Form>
							<Field type={"email"} name="email" placeholder={"email"} />
							{touched.email && errors.email && <div>{errors.email}</div>}
							<Field type={'password'} name="password" placeholder={"password1"} />
							{touched.password && errors.password ? (<div>{errors.password}</div>) : null}
							<Field type={'password'} name="password2" placeholder={"password2"} />
							{touched.password2 && errors.password2 ? (<div>{errors.password2}</div>) : null}

							<button type={"submit"} disabled={!isSubmitting}>Submit</button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}