import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const Snack = props => {

    return (
        <Snackbar 
        open={props.options.open} 
        autoHideDuration={props.options.duration} 
        anchorOrigin={props.options.position}
        onClose={props.options.close}>
            <Alert onClose={props.options.close} severity={props.options.severity} sx={{width:'100%;'}}>
                {props.options.message}
            </Alert>
        </Snackbar>        
    );
};


export default Snack;
