import React from 'react'
import {Navigate} from "react-router-dom";
import {PATH} from "./Pages";
import {useAppSelector} from "../../bll/hooks";
import s from "./styles/Profile.module.css"
import Paper from "@mui/material/Paper";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Button} from "@mui/material";
import edit from "../assets/img/profile/edit.svg"
import avatar from "../assets/img/header/Ellipse.png"
import camera from "../assets/img/profile/camera.svg"
import arrow from "../assets/img/profile/back_arrow.svg"


export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div className={s.profile}>
            <div className={s.back_arrow}>
                <a href={"#"}>
                    <img src={arrow} alt="arrow"/>
                    <span className={s.back_title}>Back to Packs List</span>
                </a>
            </div>
            <Paper elevation={3} style={{width: "413px", margin: "0 auto"}}>
                <div className={s.paper}>
                    <h3 className={s.profile_info}>Personal information</h3>

                    <div className={s.avatar_block}>
                        <img className={s.profile_avatar} src={avatar} alt="avatar"/>
                        <div className={s.camera}>
                            <button><img src={camera} alt="camera"/></button>
                        </div>
                    </div>

                    <div className={s.profile_name}>
                        <span className={s.user_name}>Ivan</span>
                        <button><img src={edit} alt="edit"/></button>
                    </div>

                    <p className={s.profile_email}>j&johnson@gmail.com</p>
                    <Button className={s.logout} variant="outlined">Log out</Button>
                </div>
            </Paper>
        </div>
    )
}