import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Item } from '../style/style';

const Upload = ( props ) => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ buffer, setBuffer ] = useState({});

    const handleTextChange = e => {
        if (e.target.id === 'title') setTitle( e.target.value );
        if (e.target.id === 'description') setDescription( e.target.value );
    }

    const handleFileChosen = async e => {
        console.log(e.target.files[0]);
        setFileName( e.target.files[0].name );
        await convertToBuffer(e.target.files[0]);
    } 

    const convertToBuffer = async file => {
        const reader = new FileReader();
        reader.onloadend = () => setBuffer( Buffer(reader.result) );
        await reader.readAsArrayBuffer(file);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.uploadVideo(buffer);
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
                    onChange={handleTextChange} />
                </Item>
                <Item elevation={3}>
                    <TextField 
                    id="description"
                    label="Description" 
                    multiline 
                    row={4} 
                    variant="filled" 
                    placeholder="Eat brioche"
                    onChange={handleTextChange} 
                    value={description}/>
                </Item>
                <Item elevation={3}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                            Upload
                            <input hidden accept="video/*" multiple type="file" onChange={ handleFileChosen }/>
                        </Button>
                        <TextField
                            placeholder="Your upload"
                            value={fileName}
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