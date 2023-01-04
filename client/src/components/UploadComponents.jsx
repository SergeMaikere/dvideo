import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { Item, InputNinja, PageContainer } from '../style/style';
import { Box, CardContent, CardHeader, Typography } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

export const Title = props => {

    const handleTitleChange = e => props.handleChange(e.target.value);  

    return(
        <Card>
            <CardHeader subheader="Find a nice title" />
            <CardContent>
                <Box mb={2}>
                    <TextField
                    id="title" 
                    label="Nice Title" 
                    variant="standard" 
                    placeholder="Rick Rolling Till I Die"
                    value={props.text}
                    onChange={handleTitleChange} />
                </Box>
            </CardContent>
        </Card>
    )  
}

export const Description = props => {

    const handleDescriptionChange = e => props.handleChange(e.target.value);  

    return(
        <Card>
            <CardHeader subheader="Describe it with style" />
            <CardContent>
                <Box mb={2}>
                    <TextField 
                    id="description"
                    label="Stylish Description" 
                    multiline 
                    row={5} 
                    variant="filled" 
                    placeholder="Never gonna give you up Never gonna let you down"
                    value={props.text}
                    onChange={handleDescriptionChange} />
                </Box>
            </CardContent>
        </Card>
    )  
}

export const SelectVideo = props => {

    const handleVideoChosen = async e => {
        props.getFileName( e.target.files[0].name );
        props.handleChange(e.target.files[0]);
    }  

    return(
        <Card>
            <CardHeader subheader="Select the video" />
            <CardContent>
                <Box mb={2}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" component="label" size="small" endIcon={<VideoCameraFrontIcon />}>
                            Video
                            <InputNinja name="video" required accept="video/*" multiple type="file" onChange={ handleVideoChosen } />
                        </Button>
                        <TextField
                            placeholder="Your video"
                            value={props.fileName}
                            InputProps={{ readOnly: true, }}
                            variant="standard"
                        />
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    )  
}

export const SelectPoster = props => {

    const handlePosterChosen = async e => {
        props.getFileName( e.target.files[0].name );
        props.handleChange(e.target.files[0]);
    } 

    return(
        <Card>
            <CardHeader subheader="Select the best poster" />
            <CardContent>
                <Box mb={2}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" component="label" size="small" endIcon={<PhotoIcon />}>
                            Poster
                            <InputNinja name="poster" required accept=".jpg, .jpeg, .png, .bmp, .gif" type="file" onChange={ handlePosterChosen } />
                        </Button>
                        <TextField
                            placeholder="Your image"
                            value={props.fileName}
                            InputProps={{ readOnly: true, }}
                            variant="standard"
                        />
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    )  
}

export const SubmitNewVideo = props => {
    return(
        <Card>
            <CardHeader subheader="At last upload your video" />
            <CardContent>
                <Box mb={2}>
                    <Typography variant="paragraph">Take the time to go back and check that all is in order for every steps. 
                    Once your video is saved you'll still be able to edit it at your convenance. See you later 🐊 </Typography>
                </Box>
            </CardContent>
        </Card>
    )  
}
