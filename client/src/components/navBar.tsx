/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  AppBar, Box, Toolbar, Typography, IconButton, Container, Avatar, Menu, MenuItem,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserProfile from '../static/userProfile.png';
import { Phase, Mode } from '../types/types';

const settings: string[] = ['Wish list', 'Visited', 'About the background'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

interface NavBarProps {
  handleModeChange: (a: Mode) => void,
  handlePhaseChange: (a: Phase) => void,
}

const NavBar: React.FC<NavBarProps> = ({ handleModeChange, handlePhaseChange }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
    let currentMode;
    if ((event.target as HTMLElement).innerText === 'Wish list') {
      currentMode = 'WISHLIST';
    } else if ((event.target as HTMLElement).innerText === 'Visited') {
      currentMode = 'VISITED';
    } else {
      currentMode = 'BACKGROUND';
    }
    handleModeChange(currentMode);
    handlePhaseChange('DISPLAY');
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              SPACE OBSERVER
            </Typography>
            <Box sx={{ ml: '80%' }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='user profile' src={UserProfile} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleClickMenuItem}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
