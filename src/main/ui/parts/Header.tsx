import {NavLink} from 'react-router-dom'
import s from './styles/Header.module.css';
import {PATH} from '../pages/Pages';
import {useAppSelector} from "../../bll/hooks";
import {logoutTC} from "../../bll/authReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {AppBar, Button, IconButton, LinearProgress, Toolbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import MemoryIcon from '@mui/icons-material/Memory';

type isActiveType = {
    isActive: boolean
}

export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const itemActive = ({isActive}: isActiveType): string => isActive ? `${s.active + ' ' + s.item}` : `${s.item}`
    const avatar = useAppSelector(state => state.profile.profile.avatar)
    const dispatch = useDispatch<AppDispatchType>()
    const logoutHandler = () => dispatch(logoutTC())

    return (
        <div>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Grid container
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="center">
                        <MemoryIcon/>
                        <Grid container
                              direction="row"
                              justifyContent="space-evenly"
                              alignItems="center">
                            <span className={s.header_name}>Ivan</span>
                            <img className={s.header_avatar} src={avatar} alt="avatar"/>

                        </Grid>
                    </Grid>
                    {isLoggedIn && <Button disabled={status === 'loading'}
                                           variant={'contained'}
                                           color={'primary'}
                                           onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <NavLink className={itemActive} to={PATH.LOGIN}>Login</NavLink>
            <NavLink className={itemActive} to={PATH.REGISTER}>Register</NavLink>
            <NavLink className={itemActive} to={PATH.PROFILE}>Profile</NavLink>
            <NavLink className={itemActive} to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
            <NavLink className={itemActive} to={PATH.NEW_PASSWORD}>New password</NavLink>
        </div>
    )
}