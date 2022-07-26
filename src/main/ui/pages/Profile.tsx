import React, {ChangeEvent, useState} from 'react'
import {Navigate} from "react-router-dom";
import {PATH} from "./Pages";
import {useAppSelector} from "../../bll/hooks";
import s from "./styles/Profile.module.css"
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import edit from "../assets/img/profile/edit.svg"
import avatarDefault from "../assets/img/header/Ellipse.png"
import camera from "../assets/img/profile/camera.svg"
import arrow from "../assets/img/profile/back_arrow.svg"
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {setNewNameTC} from "../../bll/profileReducer";
import {logoutTC} from "../../bll/authReducer";


export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const name = useAppSelector(state => state.profile.profile.name)
    const email = useAppSelector(state => state.profile.profile.email)
    const avatar = useAppSelector(state => state.profile.profile.avatar)

    console.log(avatar)
    const dispatch = useDispatch<AppDispatchType>()

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(name);
    console.log(editMode)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        dispatch(setNewNameTC(title))
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
        return <Navigate to={PATH.LOGIN}/>
    }

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
                        <img className={s.profile_avatar}
                             src={avatar === "https//avatar-url.img" ? avatarDefault : avatar} alt="avatar"/>
                        {/*<img className={s.profile_avatar} src={avatar} alt="avatar"/>*/}
                        <div className={s.camera}>
                            <button><img src={camera} alt="camera"/></button>
                        </div>
                    </div>

                    <div className={s.profile_name}>
                        {
                            editMode
                                ? <TextField
                                    id="outlined-name"
                                    label="Name"
                                    value={title}
                                    onChange={changeTitle}
                                    autoFocus
                                    onBlur={activateViewMode}
                                />
                                // : <span className={s.user_name}>{title ? title : 'Ivan'}</span>
                                : <span className={s.user_name}>{title}</span>
                        }
                        <button onClick={activateEditMode}><img src={edit} alt="edit"/></button>
                    </div>
                    {/*<p className={s.profile_email}>{email ? email : 'j&johnson@gmail.com'}</p>*/}
                    <p className={s.profile_email}>{email}</p>
                    <Button className={s.logout} variant="outlined" onClick={logoutHandler}>Log out</Button>
                </div>
            </Paper>
        </div>
    )
}