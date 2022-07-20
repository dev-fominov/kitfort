import React from "react"
import s from './styles/Button.module.css'

type ButtonType = {
	name: string
	callBack: () => void
	disabled: boolean
}

const Button = (props: ButtonType) => {

	const onClickHandler = () => {
		props.callBack()
	}

	return (
		<button className={s.btn} onClick={onClickHandler} disabled={props.disabled}>{props.name}</button>
	)
}

export default Button