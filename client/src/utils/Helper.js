
export const getVideoCount = async contract => {
    if ( isObjectEmpty(contract) ) return;
    return await contract.methods.videoCount().call();
}

export const getVideo = async ( contract, id ) => {
    if ( isObjectEmpty(contract) ) return;
    const video = await contract.methods.videos(id).call();
    return video;
}

export const getAllVideos = async (videoCount, contract) => {
    const arr = [...Array(Number(videoCount))].map((x,i) => i+1);
    return Promise.all( arr.map(async count => await contract.methods.videos(count).call()) );
}

export const prettiffyAllAcceptedExtensions = reg => reg.replace(/\(\\|\)/g, '').replace(/\|\\/g, ' ');

export const isObjectEmpty = obj => Object.keys(obj).length === 0;