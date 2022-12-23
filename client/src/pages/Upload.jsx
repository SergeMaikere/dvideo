import React, { useState } from 'react';
import { Title, Description, SelectVideo, SelectPoster, UploadVideo, SubmitNewVideo } from '../components/UploadComponents';
import StepperButtons from '../components/StepperButtons';
import { PageContainer } from '../style/style';
import UploadCtrl from '../controllers/UploadCtrl.js';
import { useNavigate } from 'react-router-dom';
import { validateUpload } from '../controllers/validateForm';
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
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ file, setFile] = useState({});
    const [ posterName, setPosterName ] = useState('');
    const [ posterFile, setPosterFile] = useState({});
    const [ videoDatas, setVideoDatas ] = useState( {} );
    const [ activeStep, setActiveStep ] = useState( 0 );

    const navigate = useNavigate();

    const steps = [
        { label: 'Title', error: 'title', component: <Title handleChange={setTitle} text={title}/>},
        { label: 'Description', error: 'description', component: <Description handleChange={setDescription} text={description}/>},
        { label: 'Video', error: 'file', component: <SelectVideo handleChange={setFile} fileName={fileName} getFileName={setFileName}/>},
        { label: 'Poster', error: 'posterFile', component: <SelectPoster handleChange={setPosterFile} fileName={posterName} getFileName={setPosterName}/>},
        { label: 'Submit', error: 'none', component: <SubmitNewVideo/>},
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

    const displayErrorMessage = step => console.log('invalid at step ' + (step + 1));

    const handleNext = e => {
        validateUpload(activeStep, getVideoDatas()) ? setActiveStep( prev => prev + 1 ) : displayErrorMessage(activeStep);
    }
    const handleBack = e => setActiveStep( prev => prev - 1 );
    const isFirstStep = i => i === 0;
    const isLastStep = ( i, arr ) => i === arr.length -1;

    const handleUpload = async () => {
        await UploadCtrl( props.contract, props.account, getVideoDatas() );
        navigate('/');
    }

    const getLastStepCaption = () => <Typography variant="caption">Last step</Typography>;

    const getSteps = arr => {
        return arr.map(
            (step, index) => {
                return(
                    <Step key={step.label}>
                        <StepLabel optional={isLastStep(index, steps) ? getLastStepCaption() : null}>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {step.component}

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
                <Card sx={{maxWidth: '360px;'}}>
                    <CardHeader title="My brand new video" />
                    <CardContent>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            { getSteps(steps) }
                        </Stepper>
                    </CardContent>
                </Card>
            </Stack>
        </PageContainer>
    );
};

export default Upload;
