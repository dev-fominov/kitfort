import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppSelector } from '../../bll/hooks';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {Avatar, Grid, LinearProgress} from '@mui/material';
import { AppDispatchType } from '../../bll/store';
import { logoutTC } from '../../bll/authReducer';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PATH } from '../pages/Pages';

export function HeaderMUI () {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.profile.name)
    const status = useAppSelector(state => state.app.status)
    const avatar = useAppSelector(state => state.profile.profile.avatar)
    const dispatch = useDispatch<AppDispatchType>()
    const logoutHandler = () => {
        dispatch(logoutTC())
        handleClose()
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1, width:"100%"}}>
            <AppBar  position="static" color='transparent'>
                <Toolbar style={{padding: '0 70px 0 70px'}}>
                    <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <AutoAwesomeMotionIcon/> CARDS
                    </Typography>
                    {isLoggedIn && (
                        <div>
                            <div  style={{display: 'flex', alignItems:"center"}}>
                            <Typography  component="div">
                              {userName}
                            </Typography>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="primary"
                            >
                                <Avatar style={{backgroundColor: '#1976d2'}} src={avatar}  sx={{ width: 40, height: 40, }} />
                            </IconButton>
                        </div>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><NavLink  to={PATH.PROFILE}>Profile</NavLink></MenuItem>
                                <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress />}
        </Box>
    );
}
