import { AxiosError } from "axios";
import { authAPI } from "../api/api";
import { setAppErrorAC, setAppStatusAC } from "./appReducer";
import { setIsLoggedInAC } from "./authReducer";
import { AppThunkType } from "./store";

const initialState: InitialStateType = {
	isRegisterIn: false
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType): InitialStateType => {
	switch (action.type) {
		case 'REGISTER':
			return { ...state, isRegisterIn: action.value }
		default:
			return state
	}
}

// actions
export const registerAC = (value: boolean) =>
	({ type: 'REGISTER', value } as const)

// thunks
export const registerTC = (email: string, password: string): AppThunkType => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.register(email, password)
		.then(res => {
			dispatch(registerAC(true))
			const rememberMe = res.rememberMe
			const data = { email, password, rememberMe }
			authAPI.login(data)
				.then(res => {
					dispatch(setIsLoggedInAC(true))
				})
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response
				? e.response.data.error
				: (e.message + ', more details in the console');

			console.log(error)
			console.log('Error: ', { ...e })
			dispatch(setAppErrorAC(error))
			dispatch(setAppStatusAC('failed'))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

export const newPasswordTC = (password: string, resetPasswordToken: string): AppThunkType => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.setNewPassword(password, resetPasswordToken)
		.then(res => {
			// dispatch(setNewPasswordAC(true))
			console.log(res)
			// dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response
				? e.response.data.error
				: (e.message + ', more details in the console');

			console.log(error)
			console.log('Error: ', { ...e })
			dispatch(setAppErrorAC(error))
			dispatch(setAppStatusAC('failed'))
		})
		.finally(() => {
			dispatch(setAppStatusAC('idle'))
		})
}

// types
export type RegisterActionType = ReturnType<typeof registerAC>

type InitialStateType = {
	isRegisterIn: boolean
}