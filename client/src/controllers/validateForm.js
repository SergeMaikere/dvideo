import * as R from 'ramda';

const EXTENSIONS_VIDEOS = /(\.mp4|\.mov|\.ogg|\.avi|\.wmv)$/i;
const EXTENSIONS_PICS = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;

const isString = src => typeof src === 'string';

const hasMinLength = R.curry(( min, src ) => src.length >= min);

const allowedExtensions = R.curry( ( reg, src ) => reg.test(src) );   

const validateText = src => R.allPass( [isString, hasMinLength(4)] )(src);

const validateFile = src => R.allPass( [isString, hasMinLength(4), allowedExtensions(EXTENSIONS_VIDEOS)] )(src);

const validatePosterFile = src => R.allPass( [isString, hasMinLength(4), allowedExtensions(EXTENSIONS_PICS)] )(src);

export const validateUpload = ( step, videoData ) => {
    const proposition = Object.keys(videoData)[step];

    if (proposition === 'title' || proposition === 'description') return validateText(videoData[proposition]);
    if (proposition === 'file') return validateFile(videoData[proposition].name);
    if (proposition === 'posterFile') return validatePosterFile(videoData[proposition].name);
}

