import React from 'react';
import s from "./styles/Header_1.module.css"
import logo from "../assets/img/header/logo.svg"
import avatar from "../assets/img/header/Ellipse.png"

export const Header_1 = () => {
    return (
        <div className={s.header}>
            <p className={s.logo}><a href="https://it-incubator.ru/"><img  src={logo} alt="logo"/></a></p>
            <div className={s.header_logging}>
                <span className={s.header_name}>Ivan</span>
                <img className={s.header_avatar} src={avatar} alt="avatar"/>
            </div>
        </div>
    );
};
