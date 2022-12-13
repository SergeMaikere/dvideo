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
    const [ played, setPlayed ] = useState( false );
    const { videoId } = useParams();

    const addView = async () => {
        if (played) return;
        await props.contract.methods.incrementViews(Number(videoId))
        .send( { from: props.account} )
        .on( 'transactionHash', hash => setPlayed(true) );
    }

    useEffect(
        () => {
            const init = async () => {
                const video = await getVideo(props.contract, Number(videoId));

                if (!video) return;

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
