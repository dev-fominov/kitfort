import {AppActionsType} from "./store";

const initialState: InitialStateType = {
    min: 0,
    max: 110,
    searchName: '',
    page: 0,
    pageCount: 5,
    sortProducts: '0updated',
    profileID: ''
}

export const searchReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case'search/SET-MIN-MAX':
            return {...state, min: action.minMax[0], max: action.minMax[1]}
        case'search/SET-SEARCH-NAME':
            return {...state, searchName: action.searchName}
        case'search/SET-PAGE':
            return {...state, page: action.page}
        case'search/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case'search/SET-SORT-PRODUCTS':
            return {...state, sortProducts: action.sortProducts}
        case'search/SET-PROFILE-ID':
            return {...state, profileID: action.profileID}
        default:
            return state
    }
}
// actions
export const setMinMaxAC = (minMax: number[]) => ({type: 'search/SET-MIN-MAX', minMax} as const)
export const setSearchNameAC = (searchName: string) => ({type: 'search/SET-SEARCH-NAME', searchName} as const)
export const setPageAC = (page: number) => ({type: 'search/SET-PAGE', page} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'search/SET-PAGE-COUNT', pageCount} as const)
export const setSortProductsAC = (sortProducts: string) => ({type: 'search/SET-SORT-PRODUCTS', sortProducts} as const)
export const setProfileIDAC = (profileID: string) => ({type: 'search/SET-PROFILE-ID', profileID} as const)


// types
export type SearchActionsType =
    |ReturnType<typeof setMinMaxAC>
    | ReturnType<typeof setSearchNameAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setSortProductsAC>
    | ReturnType<typeof setProfileIDAC>
type InitialStateType = {
    min: number
    max: number
    searchName: string
    page: number
    pageCount: number
    sortProducts: string
    profileID: string
}

