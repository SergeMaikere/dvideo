import React from 'react';
import Container from '@mui/material/Container';
import Display from '../components/Display';
import useAllVideos from '../hooks/useAllVideos';

const Home = props => {

    return (
        <Container maxWidth="lg">
            <Display videos={useAllVideos(props.contract)} />
        </Container>
    );
};


export default Home;
