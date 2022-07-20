import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from './404'
import { Login } from './Login'
import { Logout } from './Logout'
import { NewPassword } from './NewPassword'
import { Profile } from './Profile'
import { ResetPassword } from './ResetPassword'
import { TestComponent } from './TestComponent'


export const PATH = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    PROFILE: '/profile',
    RESET_PASSWORD: '/reset-password',
    NEW_PASSWORD: '/new-password',
    TEST_COMPONENT: '/test',
}

export const Pages = () => {
    return (
        <div>
            {/*Routes выбирает первый подходящий роут*/}

            <Routes>

                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR*/}
                <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />

                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path={PATH.LOGOUT} element={<Logout />} />
                <Route path={PATH.PROFILE} element={<Profile />} />
                <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
                <Route path={PATH.TEST_COMPONENT} element={<TestComponent />} />

                {/*он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route path={'/*'} element={<Error404 />} />

            </Routes>
        </div>
    )
}