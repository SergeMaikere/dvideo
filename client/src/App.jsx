//import { EthProvider } from "./contexts/EthContext";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DVideo from './contracts/DVideo.json';
import Web3 from 'web3';
import Home from './pages/Home';
import Video from './pages/VideoPage';
import Upload from './pages/Upload';
import Menu from './components/Menu';
import Cssbaseline from '@mui/material/CssBaseline';

const ERROR_ETHEREUM_BROWSER = 'Non-ethereum browser detected. You should consider using Metamask';

const App = () => {

    const [ account, setAccount ] = useState( '0x0' );
    const [ contract, setContract ] = useState( {} );

    useEffect(
        () => {
            const loadWeb3 = async () => window.ethereum ? enableMetamask() : ( window.web3 ? new Web3(Web3.currentProvider) : alert(ERROR_ETHEREUM_BROWSER) );

            const enableMetamask = async () => {
                await window.ethereum.request( {method: 'eth_requestAccounts'} );
                return new Web3(window.ethereum);
            }

            const getContract = async web3 => {
                const id = await web3.eth.net.getId();
                const address = DVideo.networks[ id ].address;
                return new web3.eth.Contract( DVideo.abi, address );
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
            }

            const init = async () => {
                const web3 = await loadWeb3();
                await getBlockChainData(web3);
            }

            init();
        }, []
    )

    return (
        <Router>
            <Cssbaseline />
            <Menu/>
            <Routes>
                <Route path='/' element={<Home contract={contract} />} />
                <Route path='/upload' element={<Upload contract={contract} account={account} />} />
                <Route path='/video/:videoId' element={<Video contract={contract} account={account} />} />
            </Routes>
        </Router>
    );
}

export default App;
