import {Pages, PATH} from '../pages/Pages'
import {useEffect} from 'react'
import './App.css'
import {initializeAppTC} from "../../bll/appReducer";
import {useAppDispatch, useAppSelector} from "../../bll/hooks";
import {CircularProgress} from "@mui/material";
import {InfoSnackbar} from "../common/InfoSnackbar";
import {HeaderMUI} from '../parts/HeaderMUI';
import {NavLink} from 'react-router-dom';
import {CustomizedDialogs} from '../common/CustomizedDialogs';

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <InfoSnackbar />
            <HeaderMUI />
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column' }}>
                <NavLink  to={PATH.LOGIN}>Login</NavLink>
                <NavLink  to={PATH.REGISTER}>Register</NavLink>
                <NavLink  to={PATH.PROFILE}>Profile</NavLink>
                <NavLink  to={PATH.RESET_PASSWORD}>Reset Password</NavLink>
                <NavLink  to={PATH.NEW_PASSWORD}>New password</NavLink>
                <NavLink  to={PATH.PACKS_LIST}>Packs List</NavLink>
                <NavLink  to={PATH.CARD}>Card</NavLink>
                <NavLink  to={PATH.ADD_NEW_CARD}>Add new card</NavLink>
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
