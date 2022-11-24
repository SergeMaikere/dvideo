import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../utils/Helper';
import ReactPlayer from 'react-player';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Video = props => {
    
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ hash, setHash ] = useState('');
    const [ channelName, setChannelName ] = useState('');
    const [ views, setViews ] = useState(0);
    const [ createdAt, setCreatedAt ] = useState('');
    const { videoId } = useParams();

    useEffect(
        () => {
            const init = async () => {
                const video = await getVideo(props.contract, videoId);
                setTitle(video.title);
                setDescription(video.description);
                setHash(video.hash);
                setChannelName(video.channelName);
                setViews(video.views);
                setCreatedAt(video.created_at);
            }
            init();
        }, [props.contract]
    )    

    return (
        <Paper elevation={1}>
            <Typography component="h4" aligh="center">{title}</Typography>
            <video src={`http://localhost:8080/ipfs/${hash}`} controls></video>
        </Paper>
    );
};


export default Video;
