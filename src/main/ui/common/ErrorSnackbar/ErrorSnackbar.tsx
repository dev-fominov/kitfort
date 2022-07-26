import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../../bll/store'
import {setAppErrorAC} from '../../../bll/appReducer'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  function ErrorSnackbar() {
    const  dispatch =  useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    const error = useSelector<RootStateType, string | null>(state => state.app.error);
    const isOpen = error != null

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}   anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}

