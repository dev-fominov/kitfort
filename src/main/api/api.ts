import axios from "axios"

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type resetPasswordParamsType = {
    email: string
    from: "test-front-admin <ai73a@yandex.by>"
    message: string
}

export type loginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type logoutResponseType = {
    info: string
    error?: string
}

export type ChangeNameResponseType = {
    updatedUser: loginResponseType
    error?: string
}

export type changeName = {
    name: string
    avatar: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<loginResponseType>(`auth/login`, data).then((res) => res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/me`).then((res) => res.data)
    },
    me() {
        return instance.post<loginResponseType>('auth/me', {}).then((res) => res.data)
    },
    changeName(data:changeName) {
        return instance.put<ChangeNameResponseType>('auth/me', data).then((res) => res.data)
    },
    register(email: string, password: string) {
        return instance.post<registerResponseType>(`auth/register`, {email, password}).then(res => res.data)
    },
    resetPassword(data: resetPasswordParamsType){
        return instance.post<ResponseType>('auth/forgot', {data}).then((res) => res.data)
    }
}

type registerResponseType = {
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