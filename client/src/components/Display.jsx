import React from 'react';
import ReactPlayer from 'react-player/lazy/index.js';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Display = props => {
    
    const displayAllVideos = videos => videos.map( 
        video => {
            const url = `http://localhost:8080/ipfs/${video.hash}?filename=${video.fileName}`;
            return (
                <Paper sx={{maxWidth: '400px'}} elevation={6} key={video.id}>
                    <h4> { video.title } </h4>
                    <video src={url} controls width="320" height="240"></video>
                </Paper>
            ) 
        }
    )
 
    return <Box sx= {{display: 'flex', flexWrap: 'wrap'}}> { displayAllVideos(props.videos) } </Box>
}


export default Display;

