import React from 'react'

import { NavLink } from 'react-router-dom'
import s from './styles/Header.module.css';
import { PATH } from '../pages/Pages';

type isActiveType = {
    isActive: boolean
}

export const Header = () => {

    const itemActive = ({ isActive }: isActiveType): string => isActive ? `${s.active + ' ' + s.item}` : `${s.item}`

    return (
        <div>
            <div className={s.menu}>
                <NavLink className={itemActive} to={PATH.LOGIN} >Login</NavLink>
                <NavLink className={itemActive} to={PATH.LOGOUT} >Logout</NavLink>
                <NavLink className={itemActive} to={PATH.PROFILE} >Profile</NavLink>
                <NavLink className={itemActive} to={PATH.RESET_PASSWORD} >Reset Password</NavLink>
                <NavLink className={itemActive} to={PATH.NEW_PASSWORD} >New password</NavLink>
                <NavLink className={itemActive} to={PATH.TEST_COMPONENT} >Test Component</NavLink>
            </div>
        </div>
    )
}