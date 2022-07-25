import {authAPI, LoginParamsType} from "../api/api";
import {AppActionsType, AppDispatchType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./appReducer";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}

export const logoutTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}


// types

export type ActionsTypeAuth = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

