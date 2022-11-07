import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import { Item, InputNinja } from '../style/style';

const Upload = ( props ) => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ posterName, setPosterName ] = useState('');
    const [ file, setFile] = useState({});
    const [ posterFile, setPosterFile] = useState({});

    const handleTextChange = e => {
        if (e.target.id === 'title') setTitle( e.target.value );
        if (e.target.id === 'description') setDescription( e.target.value );
    }

    const handleVideoChosen = async e => {
        setFileName( e.target.files[0].name );
        setFile(e.target.files[0]);
    }

    const handlePosterChosen = async e => {
        setPosterName( e.target.files[0].name );
        setPosterFile(e.target.files[0]);
    } 

    const handleSubmit = e => {
        e.preventDefault();
        props.uploadVideo( 
            {
                title: title, 
                description: description, 
                fileName: fileName, 
                file: file, 
                posterFile: posterFile
            } 
        );
    } 

    return(
        <Box sx={{height: '100vh'}}>
            <form onSubmit={handleSubmit}>
                <Item elevation={3}>
                    <TextField
                    id="title" 
                    label="Title" 
                    variant="standard" 
                    placeholder="How to solve world hunger"
                    value={title}
                    onChange={handleTextChange}
                    required />
                </Item>
                <Item elevation={3}>
                    <TextField 
                    id="description"
                    label="Description" 
                    multiline 
                    row={4} 
                    variant="filled" 
                    placeholder="Eat brioche"
                    value={description}
                    onChange={handleTextChange} />
                </Item>
                <Item elevation={3}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label" endIcon={<VideoCameraFrontIcon />}>
                            Choose video
                            <InputNinja name="video" required accept="video/*" multiple type="file" onChange={ handleVideoChosen } />
                        </Button>
                        <TextField
                            placeholder="Your video"
                            value={fileName}
                            InputProps={{ readOnly: true, }}
                            variant="standard"
                        />
                    </Stack>
                </Item>
                <Item elevation={3}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label" endIcon={<PhotoIcon />}>
                            Choose poster
                            <InputNinja name="poster" required accept=".jpg, .jpeg, .png, .bmp, .gif" type="file" onChange={ handlePosterChosen } />
                        </Button>
                        <TextField
                            placeholder="Your image"
                            value={posterName}
                            InputProps={{ readOnly: true, }}
                            variant="standard"
                        />
                    </Stack>
                </Item>
                <Item elevation={3}>
                    <Button type="submit" variant="contained">Submit</Button>
                </Item>
            </form>
        </Box>
    )
}

export default Upload;