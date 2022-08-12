import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { setAppOpenDiologsAC } from '../../bll/appReducer';
import { useAppDispatch, useAppSelector } from '../../bll/hooks';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


export interface CustomizedDialogsProps {
    children?: React.ReactNode;
    title: string
    diologsName: string
}

export function CustomizedDialogs(props: CustomizedDialogsProps) {
    const dispatch = useAppDispatch()
    const isOupenDiologs = useAppSelector(state => state.app.isOpenDiologs)
    
    const handleClickOpen = () => {
        dispatch(setAppOpenDiologsAC(props.diologsName))
    };
    const handleClose = () => {
        dispatch(setAppOpenDiologsAC('close'))
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.diologsName === isOupenDiologs}
            >
                <BootstrapDialogTitle onClose={handleClose}>
                    {props.title}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
