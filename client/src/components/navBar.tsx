/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from 'react';
import {
  AppBar, Box, Toolbar, Typography, IconButton, Container, Avatar, Menu, MenuItem,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { mainContext } from '../spaceObserverContext';
import UserProfile from '../static/userProfile.png';

const settings: string[] = ['Wish list', 'Visited', 'About the background'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

const NavBar: React.FC = () => {
  const { dispatch } = useContext(mainContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).innerText === 'Wish list') {
      dispatch({ type: 'SET_MODE', mode: 'WISHLIST' });
    } else if ((event.target as HTMLElement).innerText === 'Visited') {
      dispatch({ type: 'SET_MODE', mode: 'VISITED' });
    } else {
      dispatch({ type: 'SET_MODE', mode: 'BACKGROUND' });
    }
    dispatch({ type: 'SET_PHASE', phase: 'DISPLAY' });
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
