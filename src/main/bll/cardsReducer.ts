import { AxiosError } from 'axios';
import { CardType, packsAPI } from "../api/api";
import { AppDispatchType, AppThunkType, RootStateType } from "./store";
import { errorTC, setAppStatusAC } from "./appReducer";

const initialState: InitialStateType = {
	cards: [],
	grate: 0,
	shots: 0,
	// cardQuestion: '',
	// page: 1,
	// pageCount: 5,
	cardsTotalCount: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
	switch (action.type) {
		case 'card/SET-CARD':
			return { ...state, cards: action.cards }
		case 'card/SET-GRATE':
			return { ...state, grate: action.grate, shots: action.shots }
		default:
			return state
	}
}
// actions
export const setCardAC = (cards: Array<CardType>) => ({ type: 'card/SET-CARD', cards } as const)
export const setGrateAC = (grate: any, shots: any) => ({ type: 'card/SET-GRATE', grate, shots } as const)
export type GetStore = () => RootStateType


// thunks
export const getCardTC = (cardsPack_id: string | undefined) => (dispatch: AppDispatchType, getStore: GetStore) => {
	dispatch(setAppStatusAC('loading'))
	console.log(cardsPack_id)
	const { searchName, page, pageCount } = getStore().search
	packsAPI.getCard(cardsPack_id, searchName, page + 1, pageCount)
		.then(res => {
			console.log(res.cards)
			dispatch(setCardAC(res.cards))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}


export const addCardTC = (cardsPack_id: string, question?: string, answer?: string) => (dispatch: AppDispatchType) => {
	dispatch(setAppStatusAC('loading'))
	packsAPI.addCard(cardsPack_id, question, answer)
		.then((res) => {
			console.log(res)
			dispatch(getCardTC(cardsPack_id))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}

export const deleteCardTC = (packId: string, card_id: string) => (dispatch: AppDispatchType) => {
	dispatch(setAppStatusAC('loading'))
	packsAPI.deleteCard(card_id)
		.then(() => {
			dispatch(getCardTC(packId))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}

export const updateCardTC = (cardsPack_id: string, card_id: string, question?: string, answer?: string) => (dispatch: AppDispatchType) => {
	dispatch(setAppStatusAC('loading'))
	packsAPI.updateCard(card_id, question, answer)
		.then(() => {
			dispatch(getCardTC(cardsPack_id))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}

export const updateGradeTC = (grade: number, card_id: string): AppThunkType => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	packsAPI.updateGrade(grade, card_id)
		.then((res) => {
			let grade = res.data.updatedGrade.grade
			let shots = res.data.updatedGrade.shots
			dispatch(setGrateAC(grade, shots))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}


// types
export type CardsActionsType = ReturnType<typeof setCardAC> | ReturnType<typeof setGrateAC>
type InitialStateType = {
	cards: Array<CardType>
	grate: number
	shots: number
	// cardQuestion: string
	// page:  number
	// pageCount: number
	cardsTotalCount: number
}

