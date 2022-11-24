import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import { Item, InputNinja } from '../style/style';
import { create } from 'ipfs-http-client';

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

const Upload = ( props ) => {

    const [ loader, setLoader ] = useState( true );
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ posterName, setPosterName ] = useState('');
    const [ file, setFile] = useState({});
    const [ posterFile, setPosterFile] = useState({});

    const navigate =  useNavigate();

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

    const sendFileToIpfs = async file => {
        const result = await ipfs.add(file);
        if (result.error) alert('Upload to the cloud failed');
        return result;
    }

    const saveFileToContract = async (path, posterPath, title, description, fileName, channelName) => {
        await props.contract.methods
        .uploadVideo( path, posterPath, title, description, fileName, channelName, Date.now() )
        .send( {from: props.account} )
        .on('transactionHash', hash => console.log('File saved') );;
    }

    const uploadVideo = async () => {
        setLoader(true);
        const ipfsFileData = await sendFileToIpfs(file);
        const ipfsPosterData = await sendFileToIpfs(posterFile);
        await saveFileToContract(ipfsFileData.path, ipfsPosterData.path, title, description, fileName, getChannelName());
        setLoader(false);
        navigate('/');
    }

    const getChannelName = () => 'Generique Lambda';

    const handleSubmit = e => {
        e.preventDefault();
        uploadVideo();
    } 

    return(
        <Container maxWidth='lg'>
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
        </Container>
    )
}

export default Upload;