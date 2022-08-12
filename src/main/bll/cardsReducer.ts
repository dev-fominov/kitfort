import { AxiosError } from 'axios';
import { CardType, packsAPI } from "../api/api";
import { AppDispatchType, RootStateType } from "./store";
import { errorTC, setAppOpenDiologsAC, setAppStatusAC } from "./appReducer";

const initialState: InitialStateType = {
	cards: [],
	card: {},
	// cardQuestion: '',
	// page: 1,
	// pageCount: 5,
	cardsTotalCount: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
	switch (action.type) {
		case 'card/SET-CARDS':
			return { ...state, cards: action.cards }
		case 'card/SET-CARD-PARAMS':
			return { ...state, card: {...action.card} }
		default:
			return state
	}
}
// actions
export const setCardAC = (cards: Array<CardType>) => ({ type: 'card/SET-CARDS', cards } as const)
export const setCardParamsAC = (card: any) => ({ type: 'card/SET-CARD-PARAMS', card } as const)
export type GetStore = () => RootStateType


// thunks
export const getCardTC = (cardsPack_id: string) => (dispatch: AppDispatchType, getStore: GetStore) => {
	dispatch(setAppStatusAC('loadingDataGrid'))
	const { searchName, page, pageCount } = getStore().search
	packsAPI.getCard(cardsPack_id, searchName, page + 1, pageCount)
		.then(res => {
			dispatch(setCardAC(res.cards))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}


export const addCardTC = (cardsPack_id: string, question: string, answer: string) => (dispatch: AppDispatchType) => {
	dispatch(setAppStatusAC('loadingDataGrid'))
	dispatch(setAppOpenDiologsAC('close'))
	packsAPI.addCard(cardsPack_id, question, answer)
		.then((res) => {
			dispatch(getCardTC(cardsPack_id))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}

export const deleteCardTC = (packId: string, card_id: string) => (dispatch: AppDispatchType) => {
	dispatch(setAppStatusAC('loadingDataGrid'))
	dispatch(setAppOpenDiologsAC('close'))
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
	dispatch(setAppStatusAC('loadingDataGrid'))
	dispatch(setAppOpenDiologsAC('close'))
	packsAPI.updateCard(card_id, question, answer)
		.then(() => {
			dispatch(getCardTC(cardsPack_id))
			dispatch(setAppStatusAC('succeeded'))
		})
		.catch((e: AxiosError<{ error: string }>) => {
			dispatch(errorTC(e))
		})
}


// types
export type CardsActionsType = ReturnType<typeof setCardAC> | ReturnType<typeof setCardParamsAC>
type InitialStateType = {
	cards: Array<CardType>
	card: any
	// cardQuestion: string
	// page:  number
	// pageCount: number
	cardsTotalCount: number
}

