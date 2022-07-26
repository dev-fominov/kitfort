<<<<<<<<< Temporary merge branch 1
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionsType, authReducer} from "./authReducer";
import {ActionsTypeApp, appReducer} from "./appReducer";
=========
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthActionsType, authReducer } from "./authReducer";
import { ActionsTypeApp, appReducer } from "./appReducer";
import { RegisterActionType, registerReducer } from './registerReducer';
import {ResetPasswordActionsType, resetPasswordReducer} from "./resetPasswordReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
>>>>>>>>> Temporary merge branch 2

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

<<<<<<<<< Temporary merge branch 1
type AppActionsType = ActionsType | ActionsTypeApp
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
=========
export type AppActionsType = AuthActionsType | ActionsTypeApp | RegisterActionType | ResetPasswordActionsType
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>
>>>>>>>>> Temporary merge branch 2

// @ts-ignore
window.store = store