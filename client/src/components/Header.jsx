import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <Container maxWidth="lg">
            <Box display="flex" alignItem="center" justifyContent="center">
                <Typography variant="h1" py={5}>Header</Typography>
            </Box>
        </Container>
    );
};

export default Header;
