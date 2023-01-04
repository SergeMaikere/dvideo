import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useSince from '../hooks/useSince';

const VideoCard = props => {
    return (
        <Card elevation={0} sx={{maxWidth:"300px", mr: "6px"}}>
            <CardActionArea>
                <Link to={`/video/${props.video.id}`}>
                    <CardMedia
                        component="img"
                        src={`http://localhost:8080/ipfs/${props.video.posterHash}`}/>
                    <CardContent>
                        <Typography variant="h5">{props.video.title}</Typography>
                        <Typography variant="subtitle1">{props.video.channelName}</Typography>
                        <Stack direction="row" spacing={1} divider={ <Divider orientation="vertical" flexItem /> }>
                            <Typography variant="caption">{`${props.video.views} views`}</Typography>
                            <Typography variant="caption">{useSince(props.video.created_at)}</Typography>
                        </Stack>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
};

export default VideoCard;
