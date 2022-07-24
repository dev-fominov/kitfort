import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionsType, authReducer} from "./authReducer";
import {ActionsTypeApp, appReducer} from "./appReducer";
import { RegisterActionType, registerReducer } from './registerReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    register: registerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppActionsType = ActionsType | ActionsTypeApp | RegisterActionType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store