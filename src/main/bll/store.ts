import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionsTypeAuth, authReducer} from "./authReducer";
import {ActionsTypeApp, appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = ActionsTypeAuth | ActionsTypeApp
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store