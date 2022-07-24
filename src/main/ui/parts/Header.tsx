import { NavLink } from 'react-router-dom'
import s from './styles/Header.module.css';
import { PATH } from '../pages/Pages';
import {useAppSelector} from "../../bll/hooks";
import {logoutTC} from "../../bll/authReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../bll/store";

type isActiveType = {
    isActive: boolean
}

export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const itemActive = ({ isActive }: isActiveType): string => isActive ? `${s.active + ' ' + s.item}` : `${s.item}`
    const dispatch = useDispatch<AppDispatch>()
    const logout = () => dispatch(logoutTC())

    return (
        <div>
            <div className={s.menu}>
                <NavLink className={itemActive} to={PATH.LOGIN} >Login</NavLink>
                <NavLink className={itemActive} to={PATH.REGISTER} >Register</NavLink>
                <NavLink className={itemActive} to={PATH.PROFILE} >Profile</NavLink>
                <NavLink className={itemActive} to={PATH.RESET_PASSWORD} >Reset Password</NavLink>
                <NavLink className={itemActive} to={PATH.NEW_PASSWORD} >New password</NavLink>
                <NavLink className={itemActive} to={PATH.TEST_COMPONENT} >Test Component</NavLink>
                {isLoggedIn? <button className={s.itemActive} onClick={logout}>logout</button>: null}
            </div>
        </div>
    )
}