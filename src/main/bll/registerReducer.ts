import { AxiosError } from "axios";
import { authAPI } from "../api/api";
import { setAppStatusAC } from "./appReducer";
import { AppThunkType } from "./store";

const initialState: InitialStateType = {
	isRegisterIn: false,
	showPassword: false
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType): InitialStateType => {
	switch (action.type) {
		case 'REGISTER':
			return { ...state, isRegisterIn: action.value }
		case 'SHOW-PASSWORD':
			return { ...state, showPassword: action.value }
		default:
			return state
	}
}

// actions
export const registerAC = (value: boolean) =>
	({ type: 'REGISTER', value } as const)

export const showPasswordAC = (value: boolean) =>
	({ type: 'SHOW-PASSWORD', value } as const)

// thunks
export const registerTC = (email: string, password: string): AppThunkType => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.register(email, password)
		.then(res => {
			console.log(res)
			dispatch(registerAC(true))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response
				? e.response.data.error
				: (e.message + ', more details in the console');

			console.log(error)
			console.log('Error: ', { ...e })
		})
		.finally(() => {
			dispatch(setAppStatusAC('succeeded'))
		})
}

// types
export type RegisterActionType = ReturnType<typeof registerAC> | ReturnType<typeof showPasswordAC>

type InitialStateType = {
	isRegisterIn: boolean
	showPassword: boolean
}