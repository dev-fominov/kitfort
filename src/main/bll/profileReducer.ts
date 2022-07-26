import {authAPI, loginResponseType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./appReducer";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";

const initialState: InitialStateType = {
    profile: {} as loginResponseType
}

export const profileReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-USER-DATA':
            return {...state, profile: action.payload.data}
        case 'login/SET-NEW-NAME':
            return {...state, profile: {...state.profile, name: action.payload.value}}
        default:
            return state
    }
}

// actions
export const setUserDataAC = (data: loginResponseType) =>
    ({type: 'login/SET-USER-DATA', payload: {data}} as const)
export const setNewNameAC = (value: string) =>
    ({type: 'login/SET-NEW-NAME', payload: {value}} as const)

// thunks
export const setNewNameTC = (value: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.changeName({name: value, avatar: "https//avatar-url.img"})
        .then(res => {
            dispatch(setNewNameAC(res.updatedUser.name))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
            dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

//types
export type SetUserDataACType = ReturnType<typeof setUserDataAC>
export type SetNewNameACType = ReturnType<typeof setNewNameAC>
export type ProfileActionsType = SetUserDataACType | SetNewNameACType
type InitialStateType = {
    profile: loginResponseType
}
