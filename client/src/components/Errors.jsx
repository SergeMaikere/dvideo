import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { prettiffyAllAcceptedExtensions } from '../utils/Helper';

const minLength = process.env.REACT_APP_MIN_LENGTH;
const allowedVidExts = process.env.REACT_APP_EXTENSIONS_VIDEOS;
const allowedPicExts = process.env.REACT_APP_EXTENSIONS_PICS;


export const InvalidString = props => {
    return (
        <Alert severity="warning">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            {`Make sure it has more than ${minLength} letters.`}
        </Alert>
    );
};


export const InvalidVideoFile = props => {
    return (
        <Alert severity="warning">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            {`Make sure the file format is allowed.
            Accepted file formats : ${prettiffyAllAcceptedExtensions(allowedVidExts)}`}
        </Alert>
    );
};


export const InvalidImageFile = props => {
    return (
        <Alert severity="warning">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            {`Make sure the file format is allowed.
            Accepted file formats : ${prettiffyAllAcceptedExtensions(allowedPicExts)}`}
        </Alert>
    );
};

