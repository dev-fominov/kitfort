import {authAPI, loginResponseType} from "../api/api";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
    profile: {} as loginResponseType
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-USER-DATA':
            return {...state, profile: action.payload.data}
        case 'login/SET-NEW-NAME':
            return {...state, profile: {...state.profile, name: action.payload.value}}
        default:
            return state
    }
}

export const setUserDataAC = (data: loginResponseType) =>
    ({type: 'login/SET-USER-DATA', payload: {data}} as const)

export const setNewNameAC = (value: string) =>
    ({type: 'login/SET-NEW-NAME', payload: {value}} as const)

export const setNewNameTC = (value: string) => (dispatch: ThunkDispatch) => {
    authAPI.changeName({name: value, avatar: "https//avatar-url.img"})
        .then(res => {
                dispatch(setNewNameAC(res.updatedUser.name))
            }
        )
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', {...e})
        })
}

//types
export type SetUserDataACType = ReturnType<typeof setUserDataAC>
export type SetNewNameACType = ReturnType<typeof setNewNameAC>

export type ProfileActionsType = SetUserDataACType | SetNewNameACType

type InitialStateType = {
    profile: loginResponseType
}

type ThunkDispatch = Dispatch<ProfileActionsType>