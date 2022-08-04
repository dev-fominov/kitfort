import {AxiosError} from 'axios';
import {authAPI, LoginResponseType} from "../api/api";
import {errorTC, setAppStatusAC} from "./appReducer";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";

const initialState: InitialStateType = {
    profile: {} as LoginResponseType
}

export const profileReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-USER-DATA':
            return { ...state, profile: action.data }
        case 'login/SET-NEW-NAME':
            return { ...state, profile: { ...state.profile, name: action.value } }
        case 'login/SET-NEW-AVATAR':
            return { ...state, profile: { ...state.profile, avatar: action.avatar } }
        default:
            return state
    }
}

// actions
export const setUserDataAC = (data: LoginResponseType) =>
    ({ type: 'login/SET-USER-DATA', data } as const)
export const setNewNameAC = (value: string) =>
    ({ type: 'login/SET-NEW-NAME', value } as const)
export const setNewAvatarAC = (avatar: string | undefined) =>
    ({ type: 'login/SET-NEW-AVATAR', avatar } as const)

// thunks
export const setNewNameTC = (value: string): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.changeNameAvatar({ name: value, avatar: initialState.profile.avatar })
        .then(res => {
            dispatch(setNewNameAC(res.updatedUser.name))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const setNewAvatarTC = (avatar: unknown | undefined): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.changeNameAvatar({ name: initialState.profile.name, avatar })
        .then(res => {
            dispatch(setNewAvatarAC(res.updatedUser.avatar))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

//types
export type SetUserDataACType = ReturnType<typeof setUserDataAC>
export type SetNewNameACType = ReturnType<typeof setNewNameAC>
export type SetNewAvatarACType = ReturnType<typeof setNewAvatarAC>
export type ProfileActionsType = SetUserDataACType | SetNewNameACType | SetNewAvatarACType
type InitialStateType = {
    profile: LoginResponseType
}
