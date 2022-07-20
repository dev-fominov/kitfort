import React from 'react'
import Button from '../parts/Button'
import Checkbox from '../parts/Checkbox'
import Input from '../parts/Input'

export const TestComponent = () => {

	const onclickHandler = () => {
		console.log('click')
	}

	return (
		<div>
			Test Component
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
				<Input />
				<Checkbox />
				<Button name={'Submit'} callBack={onclickHandler} disabled={false} />
			</div>
		</div>
	)
}
