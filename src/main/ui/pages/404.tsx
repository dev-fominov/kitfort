import Button from '@mui/material/Button/Button'
import React from 'react'
import {NavLink} from 'react-router-dom'
import s from '../pages/styles/404.module.css'
import {PATH} from './Pages'

const btStyle = {borderRadius: '30px', background: "#21268", width: "250px"}


export const Error404 = () => {
    return (
        <div className={s.main}>
            <div className={s.notfound}>
                <div className={s.notfound_404}>
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable.</p>

                <NavLink to={PATH.PROFILE}>
                    <Button type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={btStyle}
                    >GO TO PROFILE
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}
