import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * IProps interface is used to define the props of LoadingWithText component
 */
interface IProps {
  text: string,
}

/**
 * 
 * LoadingWithText component is used to display a loading spinner with text
 */
const LoadingWithText = ({ text }: IProps) => {
  return (
   <Box sx={{     
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <CircularProgress/>
    <Box sx={{
      marginTop: '1rem',
    }}>
      <Typography sx={{textAlign: 'center'}}>
        {text}
      </Typography> 
      </Box>
   </Box>
  );
};

export default LoadingWithText;
