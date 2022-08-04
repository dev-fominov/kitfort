import { Pages, PATH } from '../pages/Pages'
import React, { useEffect } from 'react'
import './App.css'
import { initializeAppTC } from "../../bll/appReducer";
import { useAppDispatch, useAppSelector } from "../../bll/hooks";
import { ErrorSnackbar } from "../common/ErrorSnackbar/ErrorSnackbar";
import { CircularProgress } from "@mui/material";
import { InfoSnackbar } from "../common/InfoSnackbar/InfoSnackbar";
import { HeaderMUI } from '../parts/HeaderMUI';
import { NavLink } from 'react-router-dom';
import s from "../parts/styles/Header.module.css";

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const itemActive = ({ isActive }: any): string => isActive ? `${s.active + ' ' + s.item}` : `${s.item}`

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <InfoSnackbar />
            <ErrorSnackbar />
            <HeaderMUI />
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                <NavLink className={itemActive} to={PATH.LOGIN}>Login</NavLink>
                <NavLink className={itemActive} to={PATH.REGISTER}>Register</NavLink>
                <NavLink className={itemActive} to={PATH.PROFILE}>Profile</NavLink>
                <NavLink className={itemActive} to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
                <NavLink className={itemActive} to={PATH.NEW_PASSWORD}>New password</NavLink>
            </div>
            {!isInitialized
                ? <CircularProgress
                    sx={{
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    }} />
                : <div className="wrapper"><Pages /></div>}
        </div>
    )
}
