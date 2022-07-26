import {authAPI} from '../api/api'
import {setIsLoggedInAC} from './authReducer'
import {AppActionsType, AppDispatchType} from "./store";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)

export const initializeAppTC = () => (dispatch: AppDispatchType) => {
    authAPI.me()
        .then(res => {
            console.log(res)
            if (res.name) {
                dispatch(setIsLoggedInAC(true));
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setAppInitializedAC(true))
            dispatch(setAppErrorAC(error))
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


export type ActionsTypeApp =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedAC>
