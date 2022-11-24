import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';


const Menu = () => {

    const [ open, setOpen ] = useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const items = [

        { divider: true },
        { to: '/', text: 'Home', icon: <HomeIcon/> },
        { to: '/', text: 'Subscription', icon: <AutoAwesomeMotionIcon/> },
        { to: '/', text: 'Trending', icon: <LocalFireDepartmentIcon/> },
        { divider: true },
        { to: '/', text: 'History', icon: <LocalFireDepartmentIcon/> },
        { to: '/', text: 'Liked Videos', icon: <LocalFireDepartmentIcon/> },
        { divider: true },
        { to: '/upload', text: 'Your Studio', icon: <LocalFireDepartmentIcon/> },

    ]

    const displayMenu = arrObj => arrObj.map(
        (obj, i) => {
            
            if ( obj.hasOwnProperty('divider') ) return <Divider key={i} />;
            
            return (
                
                <List key={i}>
                    <ListItem disablePadding>
                    <Link to={obj.to}>
                        <ListItemButton>
                            <ListItemIcon> {obj.icon} </ListItemIcon>
                            <ListItemText> {obj.text} </ListItemText>
                        </ListItemButton>
                    </Link>
                    </ListItem> 
                </List> 
            
            )
        }
    )

    return (
        <Box>
            <Toolbar sx={{ mr:2, ...(open && {display: 'none'}) }}>
                <IconButton onClick={handleDrawerOpen}> 
                    <MenuIcon/> 
                </IconButton>
            </Toolbar>
            <Drawer variant="persistent" anchor="left" open={open}>
                <IconButton onClick={handleDrawerClose}> 
                    <ChevronLeftIcon/> 
                </IconButton>
                {
                    displayMenu(items)
                }
                 
            </Drawer>
        </Box>
    );
};

export default Menu;
