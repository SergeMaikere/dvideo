import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import LeftMenu from './LeftMenu';

const Menu = () => {

    const [ open, setOpen ] = useState(false);

    const handleDrawerToggle = () => setOpen(!open);
    const handleDrawerClose = () => setOpen(false);

    return (
        <Box>
            <SearchBar toggleDrawer={handleDrawerToggle} />
            <LeftMenu closeDrawer={handleDrawerClose} open={open} />
        </Box>
    );
};

export default Menu;
