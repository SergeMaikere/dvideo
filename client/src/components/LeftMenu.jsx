import React, { useState } from 'react';
import { AutoAwesomeMotion, ChevronLeft, History, Home, LocalFireDepartment, ThumbUpOffAltOutlined, VideoLibrary } from '@mui/icons-material';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const LeftMenu = props => {
    
    const items = [

        { divider: true },
        { to: '/', text: 'Home', icon: <Home/> },
        { to: '/', text: 'Subscription', icon: <AutoAwesomeMotion/> },
        { to: '/', text: 'Trending', icon: <LocalFireDepartment/> },
        { divider: true },
        { to: '/', text: 'History', icon: <History/> },
        { to: '/', text: 'Liked Videos', icon: <ThumbUpOffAltOutlined/> },
        { divider: true },
        { to: '/upload', text: 'Your Studio', icon: <VideoLibrary/> },

    ]

    const handleDrawerClose = () => props.closeDrawer();

    const DrawerHeader = styled('div')(
        ({ theme }) => (
            {
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                // necessary for content to be below app bar
                ...theme.mixins.toolbar,
                justifyContent: 'flex-end',
            }
        )
    );

    const displayMenu = arrObj => arrObj.map(
        (obj, i) => {
            if ( obj.hasOwnProperty('divider') ) return <Divider key={i} />;
            
            return (
                
                <ListItem key={i} disablePadding>
                    <Paper sx={{width: '100%'}}>
                        <Link to={obj.to}>
                            <ListItemButton onClick={handleDrawerClose}>
                                <ListItemIcon> {obj.icon} </ListItemIcon>
                                <ListItemText> {obj.text} </ListItemText>
                            </ListItemButton>
                        </Link>
                    </Paper>
                </ListItem> 
            
            )
        }
    );

    return (
        <Drawer variant="persistent" anchor="left" open={props.open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <List>{displayMenu(items)}</List>
        </Drawer>
              
    );
};

export default LeftMenu;
