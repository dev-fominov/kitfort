import {authAPI, resetPasswordParamsType} from "../api/api";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./appReducer";

const initialState: InitialStateType = {
    email: null,
    from: "test-front-admin <ai73a@yandex.by>",
    message:  `<div style="background-color: #000000; padding: 15px">Password recovery link: <a href='http://localhost:3000/Friday-project#/new-password/$token$'>link</a></div>`,
}

export const resetPasswordReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'resetPassword/SET-EMAIL':
            return {...state, email: action.email}
        default:
            return state
    }
}
// actions
export const setEmailAC = (email: string) =>
    ({type: 'resetPassword/SET-EMAIL', email} as const)


// thunks
export const resetPasswordTC = (email:string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.resetPassword({
        email,
        from: "test-front-admin <ai73a@yandex.by>",
        message:  `<div style="background-color: #000000; padding: 15px">Password recovery link: <a href='http://localhost:3000/Friday-project#/new-password/$token$'>link</a></div>`,
    })
        .then(res => {
            dispatch(setEmailAC(email))
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

// types
export type ResetPasswordActionsType = ReturnType<typeof setEmailAC>
type InitialStateType = {
    email: string | null
    from: "test-front-admin <ai73a@yandex.by>"
    message: string
}

