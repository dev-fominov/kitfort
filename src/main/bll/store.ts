import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { testActionType, testReduser } from './test-reducer';

export const rootReducer = combineReducers({
	test: testReduser
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppActionsType = testActionType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store