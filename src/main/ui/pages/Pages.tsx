import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from './404'
import { Register } from './Register'
import { NewPassword } from './NewPassword'
import { Card } from './card/Card'
import { Profile } from './Profile'
import { ResetPassword } from './ResetPassword'
import { LoginMUI } from "./LoginMUI";
import { AddNewCard } from './AddNewCard'
import { useAppSelector } from '../../bll/hooks'
import { PacksList } from './packsList/PacksList'
import { Learn } from './Learn'


export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    NEW_PASSWORD: '/new-password/*',
    PACKS_LIST: 'packs-list',
    CARD: `/packs-list/cards*`,
    PACK: '/pack',
    ADD_NEW_CARD: '/new-card',
    LEARN: '/learn/',
}

export const Pages = () => {
    const packId = useAppSelector(state => state.packs.packId)
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
                <Route path={PATH.LOGIN} element={<LoginMUI />} />
                <Route path={PATH.REGISTER} element={<Register />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
                <Route path={'packs-list/cards/:cardsPack_id'} element={<Card />} />
                <Route path={'/learn/*'} element={<Learn />} />
                <Route path={PATH.PACKS_LIST} element={<PacksList />} />
                <Route path={PATH.ADD_NEW_CARD} element={<AddNewCard />} />
                <Route path={'/*'} element={<Error404 />} />
            </Routes>
        </div>
    )
}