import React, {useEffect} from 'react'
import { Pages } from '../pages/Pages'
import { Header } from '../parts/Header'
import './App.css'
import { initializeAppTC } from "../../bll/appReducer";
import { useDispatch } from "react-redux";
import { AppDispatchType } from "../../bll/store";
import { useAppSelector } from "../../bll/hooks";
import { ErrorSnackbar } from "../common/ErrorSnackbar/ErrorSnackbar";
import { CircularProgress } from "@mui/material";
import {InfoSnackbar} from "../common/InfoSnackbar/InfoSnackbar";
import {Header_1} from "../parts/Header_1";

export const App = () => {
    const dispatch = useDispatch<AppDispatchType>()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <InfoSnackbar/>
            <ErrorSnackbar />
            <Header />
            <Header_1/>
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
