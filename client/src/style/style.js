import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export const Item = styled(Paper)`
    margin-top: 12px; 
    text-alight: center;
    padding: 12px;
`; 

export const InputNinja = styled.input`
    opacity: 0;
    width: 0;
    float: left;
    pointer-events: none;
`;

export const PageContainer = styled(Container)`
    margin: 60px 0;
`
