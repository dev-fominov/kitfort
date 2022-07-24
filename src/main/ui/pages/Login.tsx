import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik'
import {useState} from 'react'
import {Navigate, NavLink} from 'react-router-dom'
import {PATH} from "./Pages"
import styles from './styles/Login.module.css'
import {useAppSelector} from "../../bll/hooks";
import {loginTC} from "../../bll/authReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../bll/store";

interface FormValues {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown)
    }
    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
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
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    dispatch(loginTC(values))
                    actions.setSubmitting(false)
                    actions.resetForm()
                }}
            >
                {({errors, touched, isValid, dirty, status, isSubmitting}) => (
                    <Form>
                        <Field className={styles.inputForm} type={"email"} name={"email"} placeholder={"email"}/>
                        <ErrorMessage name={"email"} component={"div"}/>
                        <div className={styles.passWrapper}>
                            <Field className={styles.inputForm} type={passwordShown ? "text" : "password"}
                                   name={"password"}
                                   placeholder={"password"}/>
                            <i className={styles.icon} onClick={togglePasswordVisiblity}>{'eye'}</i>
                        </div>
                        <ErrorMessage name={"password"} component={"div"}/>
                        {touched && status}
                        <label className={styles.checkboxForm}>
                            <Field type={'checkbox'} name={'rememberMe'}/> remember me</label>
                        <div>
                            <NavLink to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
                        </div>
                        <button className={styles.buttonForm} type={"submit"} disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
            <NavLink to={PATH.REGISTER}>Register</NavLink>
        </div>
    )
}