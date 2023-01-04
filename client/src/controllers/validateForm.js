import * as R from 'ramda';

const allowedVidExts = new RegExp(process.env.REACT_APP_EXTENSIONS_VIDEOS, 'i');
const allowedPicExts = new RegExp(process.env.REACT_APP_EXTENSIONS_PICS, 'i');
const minLength = process.env.REACT_APP_MIN_LENGTH;

const isString = src => typeof src === 'string';

const hasMinLength = R.curry( ( min, src ) => src.length >= min );

const allowedExtensions = R.curry( ( reg, src ) => reg.test(src) );   

const validateText = src => R.allPass( [isString, hasMinLength(minLength)] )(src);

const validateFile = src => R.allPass( [isString, hasMinLength(minLength), allowedExtensions(allowedVidExts)] )(src);

const validatePosterFile = src => R.allPass( [isString, hasMinLength(minLength), allowedExtensions(allowedPicExts)] )(src);

export const validateUpload = ( step, videoData ) => {
    const proposition = Object.keys(videoData)[step];

    if (proposition === 'title' || proposition === 'description') return validateText(videoData[proposition]);
    if (proposition === 'file') return validateFile(videoData[proposition].name);
    if (proposition === 'posterFile') return validatePosterFile(videoData[proposition].name);
}

