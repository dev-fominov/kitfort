import {authAPI} from '../api/api'
import {setIsLoggedInAC} from './authReducer'
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";
import {setUserDataAC} from "./profileReducer";
import {errorMessage} from '../ui/common/errorMessage';
import {AxiosError} from 'axios';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    info: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INFO':
            return {...state, info: action.info}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

// actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInfoAC = (info: string | null) => ({type: 'APP/SET-INFO', info} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)

// thunks
export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    authAPI.me()
        .then(res => {
            if (res.name) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setUserDataAC(res))
            }
        })
        .catch((e) => {
            if (e.response.status !== 401) dispatch(setAppErrorAC(errorMessage(e)))
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

export const errorTC = (e: AxiosError<{ error: string }>): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppErrorAC(errorMessage(e)))
    dispatch(setAppStatusAC('failed'))
}


// types
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    info: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'loadingDataGrid' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppInfoActionType = ReturnType<typeof setAppInfoAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type ActionsTypeApp =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInfoActionType
    | ReturnType<typeof setAppInitializedAC>
