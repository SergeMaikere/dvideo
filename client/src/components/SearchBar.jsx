import React, {useState} from 'react';
import Menu from './Menu';
import Box from '@mui/material/Box';
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
    const handleSubmit = () => console.log('search', searchValue);

    return (
        <Box sx={{flexGrow:"1"}}>
            <AppBar color="transparent">
                <ToolBar sx={{mx:"6px"}}>
                    <Menu />
                    <Typography variant="h6">Dvideo</Typography>
                    <Input
                        type="text" 
                        placeholder="Search"
                        autoFocus={true}
                        edge="end"
                        sx={{mx:"auto"}}
                        endAdornment={getSearchButton()}
                        onChange={handleSearch}/>
                    <NotificationsNoneOutlinedIcon sx={{ml:"6px"}} />
                    <AccountCircleOutlinedIcon sx={{ml:"6px"}} />
                </ToolBar>
            </AppBar>
        </Box>
    );
};

export default SearchBar;
