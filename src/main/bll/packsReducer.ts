import { AxiosError } from 'axios';
import { packsAPI, PackType } from "../api/api";
import { AppActionsType, AppDispatchType, RootStateType } from "./store";
import { errorTC, setAppOpenDiologsAC, setAppStatusAC } from "./appReducer";

const initialState: InitialStateType = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0,
    packId: '',
    packName: ''
}

export const packsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return { ...state, cardPacks: action.packs, cardPacksTotalCount: action.cardPacksTotalCount }
        case 'packs/SET-PACK-ID-NAME':
            return { ...state, packId: action.id, packName: action.name }
        default:
            return state
    }
}
// actions
export const setPacksAC = (packs: Array<PackType>, cardPacksTotalCount: number) => ({ type: 'packs/SET-PACKS', packs, cardPacksTotalCount } as const)
export const setPackNameIdAC = (id: string, name?: string) => ({ type: 'packs/SET-PACK-ID-NAME', id, name } as const)
export type GetStore = () => RootStateType


// thunks
export const getPacksTC = () => (dispatch: AppDispatchType, getStore: GetStore) => {
    dispatch(setAppStatusAC('loadingDataGrid'))
    const { min, max, searchName, page, pageCount, sortProducts, profileID } = getStore().search
    packsAPI.getPacks(min, max, searchName, page + 1, pageCount, sortProducts, profileID)
        .then(res => {
            dispatch(setPacksAC(res.cardPacks, res.cardPacksTotalCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const addPackTC = (name?: string, privateValue?: boolean) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loadingDataGrid'))
    dispatch(setAppOpenDiologsAC('close'))
    packsAPI.addPack(name, privateValue)
        .then(() => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}
export const deletePackTC = (packId: string) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loadingDataGrid'))
    dispatch(setAppOpenDiologsAC('close'))
    packsAPI.deletePack(packId)
        .then(() => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const updatePackTC = (packId: string, name?: string, privateValue?: boolean) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loadingDataGrid'))
    dispatch(setAppOpenDiologsAC('close'))
    packsAPI.updatePack(packId, name, privateValue)
        .then(() => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}


// types
export type PacksActionsType = ReturnType<typeof setPacksAC> | ReturnType<typeof setPackNameIdAC>
type InitialStateType = {
    cardPacks: Array<PackType>,
    cardPacksTotalCount: number
    packId: string
    packName?: string
}

