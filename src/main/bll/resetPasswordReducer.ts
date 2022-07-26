import { AxiosError } from 'axios';
import { authAPI } from "../api/api";
import { AppActionsType, AppThunkType } from "./store";
import { errorTC, setAppErrorAC, setAppInfoAC, setAppStatusAC } from "./appReducer";

const initialState: InitialStateType = {
    email: null,
    from: "test-front-admin <ai73a@yandex.by>",
    // message: `<div style="padding: 15px">Password recovery link: <a href='https://dev-fominov.github.io/kitfort/#/new-password/$token$'>link</a></div>`,
    message: `<div style="padding: 15px">Password recovery link: <a href='http://localhost:3000/kitfort#/new-password/$token$'>link</a></div>`,
}

export const resetPasswordReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'resetPassword/SET-EMAIL':
            return { ...state, email: action.email }
        default:
            return state
    }
}
// actions
export const setEmailAC = (email: string) =>
    ({ type: 'resetPassword/SET-EMAIL', email } as const)


// thunks
export const resetPasswordTC = (email: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.resetPassword({
        email,
        from: initialState.from,
        message: initialState.message,
    })
        .then(res => {
            dispatch(setEmailAC(email))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setAppInfoAC(`We’ve sent an Email with instructions to ${email}`))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

// types
export type ResetPasswordActionsType = ReturnType<typeof setEmailAC>
type InitialStateType = {
    email: string | null
    from: "test-front-admin <ai73a@yandex.by>"
    message: string
}

