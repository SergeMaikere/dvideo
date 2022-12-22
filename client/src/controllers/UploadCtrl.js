import { create } from 'ipfs-http-client';

const UploadCtrl = async ( contract, account, videoObj ) => {

    const ipfs = create('/ip4/127.0.0.1/tcp/5001');

    const sendFileToIpfs = async file => {
        const result = await ipfs.add(file);
        if (result.error) alert('Upload to the cloud failed');
        return result;
    }

    const saveFileToContract = async (path, posterPath, title, description, fileName, channelName) => {
        await contract.methods
        .uploadVideo( path, posterPath, title, description, fileName, channelName, Date.now() )
        .send( {from: account} )
        .on( 'transactionHash', () => console.log('File Saved') );
    }

    const getChannelName = () => 'Generique Lambda';

    const uploadVideo = async () => {
        const ipfsFileData = await sendFileToIpfs(videoObj.file);
        const ipfsPosterData = await sendFileToIpfs(videoObj.posterFile);
        await saveFileToContract(ipfsFileData.path, ipfsPosterData.path, videoObj.title, videoObj.description, videoObj.fileName, getChannelName());
    }

    await uploadVideo();
    return 'success';
}

export default UploadCtrl