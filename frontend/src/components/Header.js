import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ handleMenuClick }) {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <img
                    src="../../public/images/CoderCo.jpg"
                    alt="CoderCo Logo"
                    style={{ height: 40, marginRight: 16 }}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Network Simulator Pro
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
