import React from 'react';
import Video from './Video';
import Box from '@mui/material/Box';

const Display = props => {
    
    const displayAllVideos = videos => videos.map( video =>  <Video key={video.id} video ={video} /> );
 
    return <Box sx= {{display: 'flex', flexWrap: 'wrap'}}> { displayAllVideos(props.videos) } </Box>
}


export default Display;

