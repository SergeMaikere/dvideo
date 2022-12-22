import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/ToolBar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Menu = () => {

    const [ open, setOpen ] = useState(false);
    const [ searchValue, setSearchValue] = useState( '' );

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const items = [

        { divider: true },
        { to: '/', text: 'Home', icon: <HomeIcon/> },
        { to: '/', text: 'Subscription', icon: <AutoAwesomeMotionIcon/> },
        { to: '/', text: 'Trending', icon: <LocalFireDepartmentIcon/> },
        { divider: true },
        { to: '/', text: 'History', icon: <HistoryIcon/> },
        { to: '/', text: 'Liked Videos', icon: <ThumbUpOffAltOutlinedIcon/> },
        { divider: true },
        { to: '/upload', text: 'Your Studio', icon: <VideoLibraryIcon/> },

    ]

    const displayMenu = arrObj => arrObj.map(
        (obj, i) => {
            if ( obj.hasOwnProperty('divider') ) return <Divider key={i} />;
            
            return (
                
                <List key={i}>
                    <ListItem disablePadding>
                    <Link to={obj.to}>
                        <ListItemButton onClick={handleDrawerClose}>
                            <ListItemIcon> {obj.icon} </ListItemIcon>
                            <ListItemText> {obj.text} </ListItemText>
                        </ListItemButton>
                    </Link>
                    </ListItem> 
                </List> 
            
            )
        }
    );

    const getSearchButton = () => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={handleSubmit}>
                    <SearchIcon/>
                </IconButton>
            </InputAdornment>
        );
    }

    const handleSearch = e => setSearchValue(e.target.value);
    const handleSubmit = () => {
        console.log('search', searchValue);
        setSearchValue('');
    }
    const handlePressEnter = e => { 
        if (e.key !== 'Enter') return;
        handleSubmit(); 
    }  

    return (
        <Box>
            <AppBar color="transparent" position="sticky">
                <ToolBar sx={{mx:"6px"}}>
                     <IconButton onClick={handleDrawerOpen}> 
                        <MenuIcon/> 
                    </IconButton>
                    <Typography variant="h6" sx={{display: {xs: 'none', sm: 'block'}}}>Dvideo</Typography>
                    <Input
                        type="text" 
                        placeholder="Search"
                        autoFocus={true}
                        edge="end"
                        sx={{mx:"auto"}}
                        value={searchValue}
                        endAdornment={getSearchButton()}
                        onChange={handleSearch}
                        onKeyUp={handlePressEnter}/>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <NotificationsNoneOutlinedIcon sx={{ml:"6px"}} />
                        <AccountCircleOutlinedIcon sx={{ml:"6px"}} />
                    </Box>
                </ToolBar>
            </AppBar>
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
