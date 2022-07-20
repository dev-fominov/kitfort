export type InitialStateType = {}

const initialState: InitialStateType = {}

export const testReduser = (state: InitialStateType = initialState, action: testActionType): InitialStateType => {
	switch (action.type) {
		case 'ON-CHANGE':
			return { ...state }
		default:
			return { ...state }
	}
}

export type testActionType = ReturnType<typeof onChangeAC>
export const onChangeAC = () => ({ type: 'ON-CHANGE' } as const)

// export const setSuccessTC = (success: boolean): AppThunk => (dispatch) => {
// 	dispatch(loadingAC(true))
// 	requestsAPI.requests(success)
// 		.then((res) => {
// 			dispatch(onChangeAC(res.data.yourBody.success))
// 			console.log(res.data.errorText);
// 			console.log('successTC: ' + res.data.yourBody.success);
// 		})
// 		.catch((error) => {
// 			console.log({ ...error });
// 			console.log(error.response ? error.response.data.errorText : error.message);
// 		})
// 		.finally(() => {
// 			dispatch(loadingAC(false))
// 		})
// } 