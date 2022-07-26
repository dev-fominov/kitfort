import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthActionsType, authReducer } from "./authReducer";
import { ActionsTypeApp, appReducer } from "./appReducer";
import { RegisterActionType, registerReducer } from './registerReducer';
import { ResetPasswordActionsType, resetPasswordReducer } from "./resetPasswordReducer";
import { ProfileActionsType, profileReducer } from "./profileReducer";
import { packsReducer, PacksActionsType } from './packsReducer';
import { searchReducer, SearchActionsType } from './searchReducer';
import { CardsActionsType, cardsReducer } from './cardsReducer';
// import { CardsActionsType, cardsReducer } from './cardsReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer,
    search: searchReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    | AuthActionsType
    | ActionsTypeApp
    | RegisterActionType
    | ResetPasswordActionsType
    | ProfileActionsType
    | PacksActionsType
    | SearchActionsType
    | CardsActionsType
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store