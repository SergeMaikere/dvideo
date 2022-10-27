import React, { useState } from 'react';
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
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <HomeIcon/> </ListItemIcon>
                            <ListItemText> Home </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <AutoAwesomeMotionIcon/> </ListItemIcon>
                            <ListItemText> Subscriptions </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <LocalFireDepartmentIcon/> </ListItemIcon>
                            <ListItemText> Trending </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <VideoLibraryIcon/> </ListItemIcon>
                            <ListItemText> Library </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <HistoryIcon/> </ListItemIcon>
                            <ListItemText> History </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <SmartDisplayOutlinedIcon/> </ListItemIcon>
                            <ListItemText> Your Videos </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon> <ThumbUpOffAltOutlinedIcon/> </ListItemIcon>
                            <ListItemText> Liked Videos </ListItemText>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
};

export default Menu;
