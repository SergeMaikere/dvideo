import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h1" align="center" py={5}>Header</Typography>
        </Container>
    );
};

export default Header;
