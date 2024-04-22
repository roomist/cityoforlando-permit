import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Permits from './pages/Permits';
import Add from './pages/add';
import Update from './pages/update';
import { useAuth0 } from "@auth0/auth0-react";
import { CssBaseline, Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Divider, Avatar, ListItemAvatar, Button } from '@mui/material';

const drawerWidth = 240;

const App = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {isAuthenticated && user ? (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={user.picture} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} secondary={user.email} />
                                </ListItem>
                                <ListItem>
                                    <Button fullWidth variant="contained" color="primary" onClick={() => logout({ returnTo: window.location.origin })}>
                                        Log Out
                                    </Button>
                                </ListItem>
                            </>
                        ) : (
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                                    Log In
                                </Button>
                            </ListItem>
                        )}
                        <Divider />
                        <ListItem button component="a" href="/">
                            <ListItemText primary="Permits" />
                        </ListItem>
                        <ListItem button component="a" href="/add">
                            <ListItemText primary="Add Permit" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Permits />} />
                        <Route path="/add" element={<Add />} />
                        <Route path="/update/:id" element={<Update />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        </Box>
    );
};

export default App;
