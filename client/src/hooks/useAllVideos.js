import { useState, useEffect } from 'react';
import { getVideoCount, getAllVideos, isObjectEmpty } from '../utils/Helper';

const useAllVideos = contract => {


    const [ allVideos, setAllVideos ] = useState( [] );

    useEffect(
        () => {

            const getAllVideosDatas = async contract => {
                if ( isObjectEmpty(contract) ) return;
                
                //Get videoCount
                const myVideoCount = await getVideoCount(contract)
                
                //Get all the videos data
                const myVideos = await getAllVideos(myVideoCount, contract);
                setAllVideos( [...myVideos] );
                
            }     
            
            getAllVideosDatas(contract);

        }, [ contract ]
    )
    return allVideos;
}

export default useAllVideos;