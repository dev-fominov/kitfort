import React, {ChangeEvent, useState} from 'react'
import {Navigate} from "react-router-dom";
import {PATH} from "./Pages";
import {useAppSelector} from "../../bll/hooks";
import s from "./styles/Profile.module.css"
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import edit from "../assets/img/profile/edit.svg"
import arrow from "../assets/img/profile/back_arrow.svg"
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";
import {setNewAvatarTC, setNewNameTC} from "../../bll/profileReducer";
import {logoutTC} from "../../bll/authReducer";
import {Avatar, IconButton} from '@mui/material';
import {PhotoCamera} from "@mui/icons-material";


export const Profile = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const name = useAppSelector(state => state.profile.profile.name)
    const email = useAppSelector(state => state.profile.profile.email)
    const avatar = useAppSelector(state => state.profile.profile.avatar)
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

    const convertToBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        dispatch(setNewAvatarTC(base64));
    };

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
                        <Avatar style={{backgroundColor: '#1976d2'}}  src={avatar}  sx={{ width: 110, height: 110, }} />
                        <div className={s.camera}>
                            <Avatar  sx={{ width: 35, height: 35, }} >
                                <IconButton style={{color: 'white'}} aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={e => handleFileUpload(e)}/>
                                    <PhotoCamera />
                                </IconButton>
                            </Avatar>
                        </div>
                    </div>

                    <div className={s.profile_name}>
                        {
                            editMode
                                ? <TextField
                                    variant="standard"
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