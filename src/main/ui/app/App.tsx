import {Pages, PATH} from '../pages/Pages'
import {Header} from '../parts/Header'
import React, {useEffect} from 'react'
import './App.css'
import {initializeAppTC} from "../../bll/appReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {useAppSelector} from "../../bll/hooks";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";
import {CircularProgress} from "@mui/material";
import {InfoSnackbar} from "../common/InfoSnackbar/InfoSnackbar";
import {HeaderMUI} from '../parts/HeaderMUI';
import { NavLink } from 'react-router-dom';

export const App = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <InfoSnackbar/>
            <ErrorSnackbar/>
            <HeaderMUI/>
            <div style={{display: 'flex', justifyContent:"space-evenly"}}>
            <NavLink  to={PATH.LOGIN}>Login</NavLink>
            <NavLink  to={PATH.REGISTER}>Register</NavLink>
            <NavLink  to={PATH.PROFILE}>Profile</NavLink>
            <NavLink  to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
            <NavLink  to={PATH.NEW_PASSWORD}>New password</NavLink>
            </div>
            {!isInitialized
                ? <CircularProgress
                    sx={{
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}/>
                : <div className="wrapper"><Pages/></div>}
        </div>
    )
}
