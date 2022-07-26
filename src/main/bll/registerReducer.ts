import {AxiosError} from "axios";
import {authAPI} from "../api/api";
import {errorTC, setAppInfoAC, setAppStatusAC} from "./appReducer";
import {setIsLoggedInAC} from "./authReducer";
import {AppThunkType} from "./store";
import {setUserDataAC} from "./profileReducer";

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
                    dispatch(setUserDataAC(res))
                })
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const newPasswordTC = (password: string, resetPasswordToken: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.setNewPassword(password, resetPasswordToken)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            res.info && dispatch(setAppInfoAC(res.info))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

// types
export type RegisterActionType = ReturnType<typeof registerAC>
type InitialStateType = {
    isRegisterIn: boolean
}