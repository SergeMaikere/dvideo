import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo } from '../utils/Helper';
import Container from '@mui/material/Container';
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

    const addView = async () => {
        const result = await props.contract.methods.incrementViews(Number(videoId)).call();
        const video = await props.contract.methods.videos(Number(videoId)).call();
        console.log('addView', result);
    }

    useEffect(
        () => {
            const init = async () => {
                const video = await getVideo(props.contract, Number(videoId));

                if (!video) return;

                // await props.contract.events.VideoViewed( 
                //     {}, 
                //     (error, data) => {
                //         if (error)console.log('error', error) 
                //         if (data)console.log('data', data) 
                //     }
                // )

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
        <Container>
            <Paper sx={{maxWidth: '600px'}} elevation={1}>
                <Typography component="h4" align="center">{title}</Typography>
                <video src={`http://localhost:8080/ipfs/${hash}`} controls onPlay={addView}></video>
            </Paper>
        </Container>
    );
};


export default Video;
