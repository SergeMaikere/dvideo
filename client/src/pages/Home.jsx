import React from 'react';
import { PageContainer } from '../style/style';
import Display from '../components/Display';
import useAllVideos from '../hooks/useAllVideos';

const Home = props => {

    return (
        <PageContainer>
            <Display videos={useAllVideos(props.contract)} />
        </PageContainer>
    );
};


export default Home;
