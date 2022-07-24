import React from 'react'
import {Navigate} from "react-router-dom";
import {PATH} from "./Pages";
import {useAppSelector} from "../../bll/hooks";

export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}