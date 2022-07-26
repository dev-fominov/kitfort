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

// addedUser:
// created: "2022-07-26T07:01:05.035Z"
// email: "qwert12@qwer.ru"
// isAdmin: false
// name: "qwert12@qwer.ru"
// publicCardPacksCount: 0
// rememberMe: false
// updated: "2022-07-26T07:01:05.035Z"
// verified: false
// __v: 0
// _id: "62df913190777c4f24b7421f"

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

// types
export type RegisterActionType = ReturnType<typeof registerAC>

type InitialStateType = {
	isRegisterIn: boolean
}