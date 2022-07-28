import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../../bll/store'
import { setAppInfoAC } from '../../../bll/appReducer'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export function InfoSnackbar() {
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppInfoAC(null))
    };

    const info = useSelector<RootStateType, string | null>(state => state.app.info);
    const isOpen = info != null

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert color="success" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {info}
            </Alert>
        </Snackbar>
    );
}