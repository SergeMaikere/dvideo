import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DVideo from '../contracts/DVideo.json';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Unstable_Grid2';
import Upload from '../components/Upload';
import Display from '../components/Display';
import { create } from 'ipfs-http-client';

const ipfs = create('/ip4/127.0.0.1/tcp/5001')

const ERROR_ETHEREUM_BROWSER = 'Non-ethereum browser detected. You should consider using Metamask';

const Home = props => {

    const [ loader, setLoader ] = useState( true );
    const [ account, setAccount ] = useState( '0x0' );
    const [ contract, setContract ] = useState( {} );
    const [ videoCount, setVideoCount ] = useState( 0 );
    const [ videos, setVideos ] = useState( [] );
    
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
        console.log('videoCount', videoCount)
        setVideoCount(Number(videoCount));
        
        //Get all the videos data
        const videos = await getAllVideos( videoCount, contract );
        setVideos( [...videos] );
        
        //Get all the user's videos data
    }

    const getContract = async web3 => {
        const id = await web3.eth.net.getId();
        const address = DVideo.networks[ id ].address;
        return new web3.eth.Contract( DVideo.abi, address );
    }

    const getAllVideos = async (videoCount, contract) => {
        const arr = [...Array(Number(videoCount))].map((x,i) => i+1);
        return Promise.all( arr.map(async count => await contract.methods.videos(count).call()) );
    }

    const sendFileToIpfs = async file => {
        const result = await ipfs.add(file);
        if (result.error) alert('Upload to the cloud failed');
        return result;
    }

    const saveFileToContract = async (path, posterPath, title, description, fileName, channelName) => {
        await contract.methods
        .uploadVideo( path, posterPath, title, description, fileName, channelName, Date.now() )
        .send( {from: account} )
        .on('transactionHash', hash => console.log('File saved') );;
    }

    const addNewVideo = async () => {
        setVideoCount( videoCount + 1 );
        const video = await contract.methods.videos(videoCount).call();
        setVideos( [...videos, video] );
    }

    const uploadVideo = async fileData => {
        setLoader(true);
        const ipfsFileData = await sendFileToIpfs(fileData.file);
        const ipfsPosterData = await sendFileToIpfs(fileData.posterFile);
        await saveFileToContract(ipfsFileData.path, ipfsPosterData.path, fileData.title, fileData.description, fileData.fileName, getChannelName());
        await addNewVideo();
        setLoader(false);
    }

    const getChannelName = () => 'Generique Lambda';
    
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

            <Grid2 py={6}><Display videos={videos} /></Grid2>
            <Grid2> <Upload uploadVideo={uploadVideo} /> </Grid2>
            
        </Container>
    );
};


export default Home;
