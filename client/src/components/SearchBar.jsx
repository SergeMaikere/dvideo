import React, {useState} from 'react';
import Menu from './Menu';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const SearchBar = props => {

    const [ searchValue, setSearchValue] = useState( '' );

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

    const handleDrawerToggle = () => props.toggleDrawer();

    return (
        <Box sx={{flexGrow:"1"}}>
            <AppBar color="transparent" position="sticky">
                <Toolbar sx={{mx:"6px"}}>
                     <IconButton onClick={handleDrawerToggle}> 
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default SearchBar;
