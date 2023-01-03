import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export const InvalidString = props => {
    return (
        <Alert severity="error">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            Make sure it has more than 4 letters.
        </Alert>
    );
};


export const InvalidVideoFile = props => {
    return (
        <Alert severity="error">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            Make sure the file format is allowed.
            {`Allowed file formats : ${process.env.EXTENSIONS_VIDEOS}`}
        </Alert>
    );
};


export const InvalidImageFile = props => {
    return (
        <Alert severity="error">
            <AlertTitle>{`This ${props.step} is invalid.`}</AlertTitle>
            Make sure the file format is allowed.
            {`Allowed file formats : ${process.env.EXTENSIONS_PICS}`}
        </Alert>
    );
};

