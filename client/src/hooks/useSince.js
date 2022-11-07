import { useState, useEffect } from 'react';
import { pipe } from 'ramda';

const useSince = timestamp => {

    const [ since, setSince ] = useState();

    /**
     * Gets the delta time.
     *
     * @param      {number}  timestamp  The timestamp
     * @return     {number}  The delta time.
     */
    const getDeltaTime = timestamp => Date.now() - timestamp;



    /**
     * Gets the time since upload in human readable
     *
     * @param      {number}  milliSec  time since upload in millisecondes
     * @param      {string}  time      Unit of time
     * @return     {string}  was uploaded x time ago
     */
    const getHowLongAgo = ( milliSec, time ) => {
        const number = Math.floor(milliSec / getTimeInMilliSec(time));
        return `${number} ${time}${number > 1 ? 's' : ''} ago`;
    }


    /**
     * Gets the unit of time in millisecondes
     *
     * @param      {string}  time    unit of time
     * @return     {number}  The unit of time in millisecondes.
     */
    const getTimeInMilliSec = time => {
        if (time === 'year') return 31557600000;
        if (time === 'month') return 2628000000;
        if (time === 'week') return 604800000;
        if (time === 'day') return 86400000;
        if (time === 'hour') return 3600000;
        if (time === 'min') return 60000;
    }
    
    /**
     * Swith to determin which mesure of time since upload (years, month ...)
     *
     * @param      {number}  milliSec  The time since upload in millisecondes
     * @return     {string}  was uploaded x time ago
     */
    const getSince = milliSec => {
        if ( milliSec >= getTimeInMilliSec('year') )  return getHowLongAgo( milliSec, 'year');
        if ( milliSec >= getTimeInMilliSec('month') )  return getHowLongAgo( milliSec, 'month');
        if ( milliSec >= getTimeInMilliSec('week') )  return getHowLongAgo( milliSec, 'week');
        if ( milliSec >= getTimeInMilliSec('day') )  return getHowLongAgo( milliSec, 'day');
        if ( milliSec >= getTimeInMilliSec('hour') )  return getHowLongAgo( milliSec, 'hour');
        if ( milliSec >= getTimeInMilliSec('min') )  return getHowLongAgo(milliSec, 'min');
    }

    useEffect(
        () => {
            if (!timestamp) return;
            const howLongAgo = pipe(getDeltaTime, getSince)( Number(timestamp) );
            setSince(howLongAgo);

        }, [ timestamp ]
    )
    return since;
}
export default useSince;