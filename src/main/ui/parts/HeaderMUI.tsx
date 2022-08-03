import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppDispatch, useAppSelector } from '../../bll/hooks';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import { Avatar, LinearProgress } from '@mui/material';
import { logoutTC } from '../../bll/authReducer';
import { NavLink } from 'react-router-dom';
import { PATH } from '../pages/Pages';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const menuTitleStyle = { textDecoration: 'none', color:'black' }
const iconMenuStyle = { marginRight: '10px', fontSize: '20px'}
const nameTitleStyle = { marginRight: '10px',  borderBottom:'1px dashed'}

export function HeaderMUI() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.profile.profile.name)
    const status = useAppSelector(state => state.app.status)
    const avatar = useAppSelector(state => state.profile.profile.avatar)
    const dispatch = useAppDispatch()
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
        <Box sx={{ flexGrow: 1, width: "100%", position: 'relative' }}>
            <AppBar position="static" color='transparent'>
                <Toolbar style={{ padding: '0 70px 0 70px' }}>
                    <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <AutoAwesomeMotionIcon /> CARDS
                    </Typography>
                    {isLoggedIn && (
                        <div>
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Typography style={nameTitleStyle}>
                                    {userName}
                                </Typography>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="primary"
                                >
                                    <Avatar style={{ backgroundColor: '#1976d2' }} src={avatar} sx={{ width: 40, height: 40, }} />
                                </IconButton>
                            </div>
                            <Menu
                                sx={{ mt: '40px' }}
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
                                
                                <Typography textAlign="center">
                                <MenuItem onClick={handleClose}><NavLink style={menuTitleStyle} to={PATH.PROFILE}><PersonIcon style={iconMenuStyle}/>Profile</NavLink></MenuItem>
                                <MenuItem onClick={logoutHandler}><LogoutIcon style={iconMenuStyle}/>Log Out</MenuItem>
                                </Typography>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress sx={{position: 'absolute', bottom: 0,   left: 0, right: 0}}/>}
        </Box>
    );
}
