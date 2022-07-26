// <<<<<<< HEAD
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionsTypeApp, appReducer} from "./appReducer";
import {ProfileActionsType, profileReducer} from "./profileReducer";
// =======
import { AuthActionsType, authReducer } from "./authReducer";
import { RegisterActionType, registerReducer } from './registerReducer';
import {ResetPasswordActionsType, resetPasswordReducer} from "./resetPasswordReducer";
// >>>>>>> origin/login

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

// <<<<<<< HEAD

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
// =======
export type AppActionsType = AuthActionsType | ActionsTypeApp | RegisterActionType | ResetPasswordActionsType | ProfileActionsType
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>
// >>>>>>> origin/login

// @ts-ignore
window.store = store