import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const instance2 = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>(`auth/login`, data).then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/me`).then(res => res.data)
    },
    me() {
        return instance.post<LoginResponseType>(`auth/me`, {}).then(res => res.data)
    },
    changeNameAvatar(data: { name: string; avatar: unknown | string | undefined }) {
        return instance.put<ChangeNameResponseType>(`auth/me`, data).then(res => res.data)
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`auth/register`, {email, password}).then(res => res.data)
    },
    resetPassword(data: ResetPasswordParamsType) {
        return instance2.post<ResponseType>(`auth/forgot`, data).then(res => res.data)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPassword>(`auth/set-new-password`, {
            password,
            resetPasswordToken
        }).then(res => res.data)
    }
}

export const packsAPI = {
    getPacks(min?: number,
             max?: number,
             searchName?: string,
             page?: number,
             pageCount?: number,
             sortProducts?: string,
             userId?: string) {
        return instance.get<GetPacksResponseType>(`cards/pack?`
            + (max ? `min=${min}&max=${max}&` : '')
            + (searchName ? `packName=${searchName}&` : '')
            + (page ? `page=${page}&` : '')
            + (pageCount ? `pageCount=${pageCount}&` : '')
            + (sortProducts ? `sortProducts=${sortProducts}&` : '')
            + (userId ? `user_id=${userId}&` : '')).then(res => res.data)
    },
    addPack(name?: string) {
        return instance.post(`cards/pack`, {
            cardsPack:
                {name: name || 'new test pack', deckCover: '', private: false}
        })
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    },
    updatePack(packId: string, name?: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id: packId, name: name || 'no name'}})
    },
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResetPasswordParamsType = {
    email: string
    from: "test-front-admin <ai73a@yandex.by>"
    message: string
}
export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | undefined;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type ResponseType = {
    info: string
    error?: string
}
export type ChangeNameResponseType = {
    updatedUser: LoginResponseType
    error?: string
}
export type ChangeName = {
    name: string
    avatar: unknown | string | undefined
}
type RegisterResponseType = {
    created: Date;
    email: string;
    isAdmin: boolean;
    name: string;
    publicCardPacksCount: number; // количество колод
    rememberMe: boolean;
    updated: Date;
    verified: boolean; // подтвердил ли почту
    __v: number
    _id: string;
}
type SetNewPassword = {
    info: string
    error: string
}

export type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number// количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number // количество элементов на странице
    token: string
    tokenDeathTime: number
}
export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}