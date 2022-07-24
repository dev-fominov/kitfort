import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './styles/Header.module.css';
import {PATH} from '../pages/Pages';
import {useAppSelector} from "../../bll/hooks";
import {logoutTC} from "../../bll/authReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

type isActiveType = {
    isActive: boolean
}

export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const itemActive = ({isActive}: isActiveType): string => isActive ? `${s.active + ' ' + s.item}` : `${s.item}`
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
                        <NavLink className={itemActive} to={PATH.LOGIN}>Login</NavLink>
                        <NavLink className={itemActive} to={PATH.LOGOUT}>Logout</NavLink>
                        <NavLink className={itemActive} to={PATH.PROFILE}>Profile</NavLink>
                        <NavLink className={itemActive} to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
                        <NavLink className={itemActive} to={PATH.NEW_PASSWORD}>New password</NavLink>
                        <NavLink className={itemActive} to={PATH.TEST_COMPONENT}>Test Component</NavLink>
                        </Grid>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
        </div>
    )
}