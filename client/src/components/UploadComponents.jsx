import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { Item, InputNinja, PageContainer } from '../style/style';
import { create } from 'ipfs-http-client';
import { CardContent, CardHeader } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

export const Title = props => {

    const handleTitleChange = e => props.handleChange(e.target.value);  

    return(
        <Card>
            <CardHeader subheader="Give it a nice title" />
            <CardContent>
                <Box mb={2}>
                    <TextField
                    id="title" 
                    label="Title" 
                    variant="standard" 
                    placeholder="How to solve world hunger"
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
                    label="Description" 
                    multiline 
                    row={4} 
                    variant="filled" 
                    placeholder="Eat brioche"
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

export const UploadVideo = props => {

    // const sendFileToIpfs = async file => {
    //     const result = await ipfs.add(file);
    //     if (result.error) alert('Upload to the cloud failed');
    //     return result;
    // }

    // const saveFileToContract = async (path, posterPath, title, description, fileName, channelName) => {
    //     await props.contract.methods
    //     .uploadVideo( path, posterPath, title, description, fileName, channelName, Date.now() )
    //     .send( {from: props.account} )
    //     .on('transactionHash', hash => console.log('File saved') );;
    // }

    // const uploadVideo = async () => {
    //     setLoader(true);
    //     const ipfsFileData = await sendFileToIpfs(file);
    //     const ipfsPosterData = await sendFileToIpfs(posterFile);
    //     await saveFileToContract(ipfsFileData.path, ipfsPosterData.path, title, description, fileName, getChannelName());
    //     setLoader(false);
    //     navigate('/');
    // }

    return(
        <Card>
            <Box mb={2}>
                <Button type="submit" variant="outlined" size="small">Submit</Button>
            </Box>
        </Card>
    )  
}

const UploadComponents = ( props ) => {

    const [ loader, setLoader ] = useState( true );
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ file, setFile] = useState({});
    const [ posterName, setPosterName ] = useState('');
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
        <PageContainer maxWidth='lg'>
            <Stack direction="row" justifyContent="center">
                <Card sx={{p: 3}}>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                            id="title" 
                            label="Title" 
                            variant="standard" 
                            placeholder="How to solve world hunger"
                            value={title}
                            onChange={handleTextChange}
                            required />
                        </Box>
                        <Box mb={2}>
                            <TextField 
                            id="description"
                            label="Description" 
                            multiline 
                            row={4} 
                            variant="filled" 
                            placeholder="Eat brioche"
                            value={description}
                            onChange={handleTextChange} />
                        </Box>
                        <Box mb={2}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" component="label" size="small" endIcon={<VideoCameraFrontIcon />}>
                                    Video
                                    <InputNinja name="video" required accept="video/*" multiple type="file" onChange={ handleVideoChosen } />
                                </Button>
                                <TextField
                                    placeholder="Your video"
                                    value={fileName}
                                    InputProps={{ readOnly: true, }}
                                    variant="standard"
                                />
                            </Stack>
                        </Box>
                        <Box mb={2}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" component="label" size="small" endIcon={<PhotoIcon />}>
                                    Poster
                                    <InputNinja name="poster" required accept=".jpg, .jpeg, .png, .bmp, .gif" type="file" onChange={ handlePosterChosen } />
                                </Button>
                                <TextField
                                    placeholder="Your image"
                                    value={posterName}
                                    InputProps={{ readOnly: true, }}
                                    variant="standard"
                                />
                            </Stack>
                        </Box>
                        <Box mb={2}>
                            <Button type="submit" variant="outlined" size="small">Submit</Button>
                        </Box>
                    </form>
                </Card>
            </Stack>
        </PageContainer>
    )
}
