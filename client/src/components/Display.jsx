import React from 'react';
import ReactPlayer from 'react-player/lazy/index.js';
import Box from '@mui/material/Box';

const Display = props => {
    
    const displayAllVideos = videos => videos.map( 
        video => {
            return (
                <div key={video.id}>
                    <h4> { video.title } </h4>
                    <ReactPlayer url={`http://localhost:8080/ipfs/${video.hash}`} />
                </div>
            ) 
        }
    )
 
    return <Box> { displayAllVideos(props.videos) } </Box>
}


export default Display;

