import React from 'react';
import VideoCard from './VideoCard';
import Masonry from '@mui/lab/Masonry';

const Display = props => {
 
    return (
        <Masonry columns={{xs: 1, sm:3, md:4, lg:5}} spacing={2}> 
            {props.videos.map(video =>  <VideoCard key={video.id} video ={video} />)} 
        </Masonry>
    )
}

export default Display;

