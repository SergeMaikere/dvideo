import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';

const VideoSideBar = props => {
    return (
        <Box flex={2}>
            <Card>
                <CardHeader title="Sidebar" />
                <CardContent>
                    <Typography variant="body1">
                        Lorem, ipsum dolor sit amet consectetur, adipisicing elit. 
                        Recusandae, repellat excepturi voluptates nam laborum maxime soluta tempore, accusamus minima eligendi mollitia rerum! 
                        At neque omnis vel velit eos esse vero!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

VideoSideBar.displayName = 'VideoSideBar';

export default VideoSideBar;
