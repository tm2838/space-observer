import React, { useContext } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { mainContext } from '../../spaceObserverContext';

const Loading: React.FC = () => {
  const { state: { currentState } } = useContext(mainContext);
  return (
  <Box
  sx={{
    p: 4, height: 5 / 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
  }}
>
  <Box sx={{ mx: '25%', mb: '5%' }}>
    <Typography
      variant='h3'
      noWrap
      component='div'
      color='black'
    >
      Parks in {currentState}
    </Typography>
  </Box>
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
</Box>
  );
};

export default Loading;
