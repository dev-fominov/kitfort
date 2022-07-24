import { authAPI } from "../api/api";
import { AppThunk } from "./store";

const initialState: InitialStateType = {
	isLoggedIn: false
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}

// actions
export const registerAC = (value: boolean) =>
	({ type: 'login/SET-IS-LOGGED-IN', value } as const)

type RegisterType = {
	email: string
	password: string
}
// thunks
export const registerTC = (email: string, password: string): AppThunk => (dispatch) => {
	authAPI.register(email, password)
		.then(res => {
			// dispatch(registerAC(true))
			console.log(res)
		})
		// .catch((e) => {
		// 	const error = e.response
		// 		? e.response.data.error
		// 		: (e.message + ', more details in the console');
		// 	console.log('Error: ', { ...e })
		// })
}

// types
export type RegisterActionType = ReturnType<typeof registerAC>

type InitialStateType = {
	isLoggedIn: boolean
}