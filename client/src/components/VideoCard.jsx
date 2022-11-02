import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const VideoCard = props => {
    return (
        <Card elevation={0} sx={{maxWidth:"360px", mr: "6px"}}>
            <CardActionArea>
                <CardMedia
                    component="video"
                    image={`http://localhost:8080/ipfs/${props.video.hash}?filename=${props.video.fileName}`} 
                    sx={{maxHeight:"200px"}} />
                <CardContent>
                    <Typography variant="h5">{props.video.title}</Typography>
                    <Typography variant="subtitle1">Channel name</Typography>
                    <Stack direction="row" spacing={1} divider={ <Divider orientation="vertical" flexItem /> }>
                        <Typography variant="caption">6k Views</Typography>
                        <Typography variant="caption">2 days ago</Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default VideoCard;
