//import { EthProvider } from "./contexts/EthContext";
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DVideo from '../contracts/DVideo.json';

const ERROR_ETHEREUM_BROWSER = 'Non-ethereum browser detected. You should consider using Metamask';

const App = () => {

    useEffect(
        () => {
            const init = async () => {
                const web3 = await loadWeb3();
                await getBlockChainData(web3);
            }
            init();
        }, []
    )

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
        console.log('Accounts', accounts)
        setAccount(accounts);

        //Get contract
        const contract = await getContract(web3);
        console.log('Contract', contract);
        setContract(contract);

        //Get video count from contract
        const videoCount = await contract.methods.videoCount().call();
        console.log('videCount', videoCount);
        setVideoCount(videoCount);
        
        //Get all the videos data
        const videos = await getAllVideos( videoCount, contract );
        console.log('videos', videos);
        setVideos( [...videos] );

        //Get all the user's videos data
    }

    const getContract = async web3 => {
        const id = await web3.eth.net.getId();
        const address = DVideo.networks[ id ].address;
        return new web3.eth.Contract( DVideo.abi, address );
    }

    const getAllVideos = async (videoCount, contract) => Promise.all( [...Array(videoCount)].map(async (count) => await contract.methods.videos(count).call()) );
 
    return (
        <div>APP COMPONENT</div>
    );
}

export default App;
