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
        return instance.post<loginResponseType>(`auth/login`, data).then(res => res.data)},
    logout() {
        return instance.delete<ResponseType>(`auth/me`).then(res => res.data)},
    me() {
        return instance.post<loginResponseType>(`auth/me`, {}).then(res => res.data)},
    changeNameAvatar(data: { name: string; avatar:  unknown | string | undefined}) {
        return instance.put<ChangeNameResponseType>(`auth/me`, data).then(res => res.data)},
    register(email: string, password: string) {
        return instance.post<registerResponseType>(`auth/register`, {email, password}).then(res => res.data)},
    resetPassword(data: resetPasswordParamsType){
        return instance2.post<ResponseType>(`auth/forgot`, data).then(res => res.data)},
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPassword>(`auth/set-new-password`, {password, resetPasswordToken}).then(res => res.data)}
}

// types
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
    updatedUser: loginResponseType
    error?: string
}
export type changeName = {
    name: string
    avatar:  unknown | string | undefined
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
type SetNewPassword = {
    info: string
    error: string
}