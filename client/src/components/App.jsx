//import { EthProvider } from "./contexts/EthContext";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DVideo from '../contracts/DVideo.json';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Upload from './Upload';
import { pipe, pipeWith, andThen } from 'ramda';
import { create } from 'ipfs-http-client';

const ipfs = create({ url: "https://ipfs.infura.io/5001" });

const ERROR_ETHEREUM_BROWSER = 'Non-ethereum browser detected. You should consider using Metamask';

const App = () => {

    const [ loader, setLoader ] = useState( true );
    const [ account, setAccount ] = useState( '0x0' );
    const [ contract, setContract ] = useState( {} );
    const [ videoCount, setVideoCount ] = useState( 0 );
    const [ videos, setVideos ] = useState( [] );
    const [ newVideo, setNewVideo ] = useState( {} );
    
    const loadWeb3 = async () => window.ethereum ? enableMetamask() : ( window.web3 ? new Web3(Web3.currentProvider) : alert(ERROR_ETHEREUM_BROWSER) );

    const enableMetamask = async () => {
        await window.ethereum.request( {method: 'eth_requestAccounts'} );
        return new Web3(window.ethereum);
    }

    const getBlockChainData = async web3 => {

        //Get Account adress from metamask
        const [ accounts, error ] = await web3.eth.getAccounts();
        if ( error ) alert('No account detected');
        //console.log('Accounts', accounts)
        setAccount(accounts);

        //Get contract
        const contract = await getContract(web3);
        //console.log('Contract', contract);
        setContract(contract);

        //Get video count from contract
        const videoCount = await contract.methods.videoCount().call();
        //console.log('videCount', videoCount);
        setVideoCount(videoCount);
        
        //Get all the videos data
        const videos = await getAllVideos( videoCount, contract );
        //console.log('videos', videos);
        setVideos( [...videos] );

        //Get all the user's videos data
    }

    const getContract = async web3 => {
        const id = await web3.eth.net.getId();
        const address = DVideo.networks[ id ].address;
        return new web3.eth.Contract( DVideo.abi, address );
    }

    const getAllVideos = async (videoCount, contract) => Promise.all( 
        [...Array(videoCount)].map(async (count) => await contract.methods.videos(count).call()) 
    );

    // const convertToBuffer = formData => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => setNewVideo( {...formData, buffer: Buffer(formData.file)} );
    //     reader.readAsArrayBuffer(formData.file);
    // }

    const sendFileToIpfs = async formData => {
        const result = await ipfs.add(formData.buffer);
        if (error) alert('Upload to the cloud failed');
        return ({...formData, ipfsData: result});
    }

    const saveFileToContract = async ipfsData => {
        await contract.methods
        .uploadVideo( ipfsData.ipfsData.hash, ipfsData.title, ipfsData.description )
        .send( {from: account} );
        return ipfsData;
    }

    const addVideo = async videoData => {
        setVideoCount( videoCount++ );
        const video = await contract.methods.videos(videoCount);
        setVideos( [...videos, video] );
        notifyUser(`video : ${videoData.title} succesfuly uploaded`);
    }

    const notifyUser = msg => alert(msg);

    const uploadVideo = async formData => {
        //setNewVideo(formData)
        const ipfsData = await sendFileToIpfs(formData);
        const videoData = await saveFileToContract(ipfsData);
        await addVideo(videoData);
    }
    

    useEffect(
        () => {
            const init = async () => {
                const web3 = await loadWeb3();
                await getBlockChainData(web3);
                setLoader(false);
            }
            init();
        }, []
    )
 
    return (
        <Container maxWidth="lg">

            <Grid2 container spacing={2}>
                <Grid2 sm={3}></Grid2>
                <Grid2 sm={9}><Upload uploadVideo={uploadVideo} /></Grid2>
            </Grid2>
            <Alert severity="success" onClose={ () => {} }>
                <AlertTitle>Success !</AlertTitle>
                <Typography variant="body1">Upload was a success</Typography> 
            </Alert>
        </Container>
    );
}

export default App;
