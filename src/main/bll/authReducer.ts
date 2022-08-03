import {AxiosError} from 'axios';
import {authAPI, LoginParamsType} from "../api/api";
import {setUserDataAC} from "./profileReducer";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";
import {errorTC, setAppErrorAC, setAppInfoAC, setAppStatusAC} from "./appReducer";
import {errorMessage} from '../ui/common/errorMessage';

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
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserDataAC(res))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const logoutTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            res.info && dispatch(setAppInfoAC(res.info))
            }
        )
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}

