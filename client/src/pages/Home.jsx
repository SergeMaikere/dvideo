import React from 'react';
import Display from '../components/Display';
import useAllVideos from '../hooks/useAllVideos';
import { Container } from '@mui/material';

const Home = props => {

    return (
        <Container maxWidth="lg">
            <Display videos={useAllVideos(props.contract)} />
        </Container>
    );
};


export default Home;
