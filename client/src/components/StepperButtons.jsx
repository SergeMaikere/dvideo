import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';

const StepperButtons = props => {

    const handleNext = () => props.isLastStep ? props.upload() : props.handleNext();
    const handleBack = () => props.handleBack();

    return (
        <Box sx={{ mb: 2 }}>
            <ButtonGroup variant="text">
                <Button
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}>
                    {props.isLastStep ? 'Finish' : 'Continue'}
                </Button>
                <Button
                disabled={props.isFirstStep}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}>
                    Back
                </Button>
            </ButtonGroup>
        </Box>       
    );
}


export default StepperButtons;
