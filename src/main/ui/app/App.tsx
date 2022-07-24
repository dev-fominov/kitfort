import React, {useEffect} from 'react'
import { Pages } from '../pages/Pages'
import { Header } from '../parts/Header'
import './App.css'
import {initializeAppTC} from "../../bll/appReducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../bll/store";
import {useAppSelector} from "../../bll/hooks";
import Preloader from "../common/utils/Preloader/Preloader";


export const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader/>
        </div>

    }
        return (
            <div className="App">
                <Header/>
                <div className="wrapper">
                    <Pages/>
                </div>
            </div>
        )
}
