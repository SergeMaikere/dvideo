import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

const Display = props => {
 
    return (
        <Masonry columns={4} spacing={2}> 
            {props.videos.map(video =>  <VideoCard key={video.id} video ={video} />)} 
        </Masonry>
    )
}

export default Display;

