import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Item } from '../style/style';

const Upload = ( props ) => {

    const [ formData, setFormData ] = useState( {title: '', description: '', file: {name: ''}} );

    const handleTextChange = e => {
        let newFormData = { ...formData };
        newFormData[e.target.id] = e.target.value;
        setFormData( {...newFormData} );
    }

    const handleFileChosen = async e => {
        console.log(e.target.files[0]);
        await convertToBuffer(e.target.files[0]);
        setFormData( {...formData, file: e.target.files[0]} );
    } 

    const convertToBuffer = async file => {
        const reader = new FileReader();
        reader.onloadend = () => setFormData( {...formData , buffer: Buffer(reader.result)} );
        await reader.readAsArrayBuffer(file);
    }

    const handleSubmit = e => {
        console.log(formData)
        e.preventDefault();
        props.uploadVideo(formData);
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
                    value={formData.title}
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
                    value={formData.description}/>
                </Item>
                <Item elevation={3}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                            Upload
                            <input hidden accept="video/*" multiple type="file" onChange={ handleFileChosen }/>
                        </Button>
                        <TextField
                            placeholder="Your upload"
                            value={formData.file.name}
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