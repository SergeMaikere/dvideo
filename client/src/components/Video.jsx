import React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';

const Video = props => {
    return (
        <Paper elevation={3} sx={{maxWidth:"360px"}} sx={{mr: 1}}>
            <CardMedia
                component="video"
                height="200"
                controls
                src={`http://localhost:8080/ipfs/${props.video.hash}?filename=${props.video.fileName}`} />
            <CardContent sx={{py: 0}}>
                <Typography>{props.video.title}</Typography>
                <Tooltip title={props.video.description}>
                    <Typography variant="body2" color="text.secondary" noWrap={true}>{props.video.description}</Typography>
                </Tooltip>
            </CardContent>
            <CardActions sx={{py: 0}}>
                <IconButton size="sm" aria-label="share"> <ShareIcon color="primary"/> </IconButton>
                <IconButton size="sm" aria-label="like"> <ThumbUpIcon color="primary"/> </IconButton>
            </CardActions>
        </Paper>

    );
};

export default Video;
