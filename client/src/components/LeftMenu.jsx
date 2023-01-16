import React from 'react';
import { AutoAwesomeMotion, ChevronLeft, History, Home, LocalFireDepartment, ThumbUpOffAltOutlined, VideoLibrary } from '@mui/icons-material';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled } from '@mui/material';
import { StyledLink } from '../style/style';

const LeftMenu = props => {
    
    const items = [

        { to: '/', text: 'Home', icon: <Home/> },
        { to: '/', text: 'Subscription', icon: <AutoAwesomeMotion/> },
        { to: '/', text: 'Trending', icon: <LocalFireDepartment/> },
        { to: '/', text: 'History', icon: <History/> },
        { to: '/', text: 'Liked Videos', icon: <ThumbUpOffAltOutlined/> },
        { to: '/upload', text: 'Your Studio', icon: <VideoLibrary/> },

    ]

    const handleDrawerClose = () => props.closeDrawer();

    const DrawerHeader = styled('div')(
        ({ theme }) => (
            {
                display: 'flex',
                alignItems: 'center',
                //padding: theme.spacing(0, 1),
                // necessary for content to be below app bar
                ...theme.mixins.toolbar,
                justifyContent: 'flex-end',
            }
        )
    );

    const displayMenu = arrObj => arrObj.map(
        (obj, i) => {            
            return (
                <ListItem key={i}>
                    <Paper elevation={3} sx={{width: '100%'}}>
                        <StyledLink to={obj.to}>
                            <ListItemButton onClick={handleDrawerClose}>
                                <ListItemIcon> {obj.icon} </ListItemIcon>
                                <ListItemText> {obj.text} </ListItemText>
                            </ListItemButton>
                        </StyledLink>
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
