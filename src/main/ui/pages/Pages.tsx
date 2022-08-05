import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from './404'
import { Register } from './Register'
import { NewPassword } from './NewPassword'
import { Card } from './Card'
import { Profile } from './Profile'
import { ResetPassword } from './ResetPassword'
import { LoginMUI } from "./LoginMUI";
import { PacksList } from "./PacksList";
export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    NEW_PASSWORD: '/new-password/*',
    PACKS_LIST: 'packs-list',
    CARD: '/card/',
}

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
                <Route path={PATH.LOGIN} element={<LoginMUI />} />
                <Route path={PATH.REGISTER} element={<Register />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
                <Route path={'/card/*'} element={<Card />} />
                <Route path={PATH.PACKS_LIST} element={<PacksList />} />
                <Route path={'/*'} element={<Error404 />} />
            </Routes>
        </div>
    )
}