import React, { useState } from 'react';
import { Title, Description, SelectVideo, SelectPoster, SubmitNewVideo } from '../components/UploadComponents';
import { InvalidImageFile, InvalidString, InvalidVideoFile } from '../components/Errors';
import StepperButtons from '../components/StepperButtons';
import { PageContainer } from '../style/style';
import UploadCtrl from '../controllers/UploadCtrl.js';
import { useNavigate } from 'react-router-dom';
import { validateUpload } from '../controllers/validateForm';
import Loading from '../Loading';
import Snack from '../components/Snack';
import { 
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardHeader, Stack, Step, 
    StepContent, 
    StepLabel, 
    Stepper, 
    Typography } from '@mui/material';

const Upload:React.FC = (props) => {

    const [ loader, setLoader ] = useState( false );
    const [ uploaded, setUploaded] = useState( false );
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ file, setFile] = useState({});
    const [ posterName, setPosterName ] = useState('');
    const [ posterFile, setPosterFile] = useState({});
    const [ videoDatas, setVideoDatas ] = useState( {} );
    const [ activeStep, setActiveStep ] = useState( 0 );
    const [ isActiveStepValid, setISActiveStepValid ] = useState( true );

    const navigate = useNavigate();
    const closeSnackbar = () => setUploaded(false);
    const steps = [
        { label: 'Title', type: 'text', component: <Title handleChange={setTitle} text={title}/>},
        { label: 'Description', type: 'text', component: <Description handleChange={setDescription} text={description}/>},
        { label: 'Video', type: 'videoFile', component: <SelectVideo handleChange={setFile} fileName={fileName} getFileName={setFileName}/>},
        { label: 'Poster', type: 'imageFile', component: <SelectPoster handleChange={setPosterFile} fileName={posterName} getFileName={setPosterName}/>},
        { label: 'Submit', type: 'submit', component: <SubmitNewVideo/>}
    ]

    const getVideoDatas = () => (
        {
            title: title,
            description: description,
            file: file,
            posterFile: posterFile,
            fileName: fileName,
            posterName: posterName
        }
    )


    const handleNext = e => {
        validateUpload(activeStep, getVideoDatas()) ? toNextStep() : displayErrorMessage(activeStep);
    }

    const toNextStep = () => {
        setISActiveStepValid(true);
        setActiveStep( prev => prev + 1 );
    }

    const displayErrorMessage = step => setISActiveStepValid(false);

    const handleBack = e => {
        setISActiveStepValid(true);
        setActiveStep( prev => prev - 1 );
    }
    const isFirstStep = i => i === 0;
    const isLastStep = ( i, arr ) => i === arr.length -1;

    const handleUpload = async () => {
        setLoader(true);
        await UploadCtrl( props.contract, props.account, getVideoDatas() );
        setLoader(false);
        setUploaded(true);
        await toHomepage();
    }

    const toHomepage = async () => setTimeout( () => navigate('/'), 5000 );

    const setErrorAlert = (type, label) => {
        if (type === 'text') return <InvalidString step={label} />;
        if (type === 'videoFile') return <InvalidVideoFile step={label} />;
        if (type === 'imageFile') return <InvalidImageFile step={label} />;
    }

    const getSteps = arr => {
        return arr.map(
            (step, index) => {
                return(
                    <Step key={step.label}>
                        <StepLabel optional={isLastStep(index, steps) ? <Typography variant="caption">Last step</Typography> : null}>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.component}
                            {!isActiveStepValid && setErrorAlert(step.type, step.label)}
                            <StepperButtons 
                            handleNext={handleNext}
                            handleBack={handleBack}
                            isFirstStep={isFirstStep(index)} 
                            isLastStep={isLastStep(index, steps)}
                            upload={handleUpload} />
                        </StepContent>
                    </Step>
                )
            }
        )
    }

    return (
        <PageContainer>
            <Stack direction='row' justifyContent="center">

                <Card sx={{minWidth: {sm: '600px', xs: '300px'}}}>
                    <CardHeader title="My brand new video" />
                    <CardContent>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            { getSteps(steps) }
                        </Stepper>
                    </CardContent>
                </Card>
            </Stack>
            <Loading open={loader} />
            <Snack 
            options={
                {
                    open: uploaded,
                    close: closeSnackbar,
                    duration: 4000,
                    message: 'Was successfully uploaded to the Matrix',
                    severity: 'success',
                    position: {vertical: 'top', horizontal: 'center'}
                }
            } />
        </PageContainer>
    );
};

export default Upload;
