import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import StateSelection from './stateSelection';
import { mainContext } from '../../spaceObserverContext';

const UserInput: React.FC = () => {
  const { state: { currentState }, dispatch } = useContext(mainContext);

  const handleConfirm = () => {
    dispatch({ type: 'SET_PHASE', phase: 'LOADING' });
    fetch(`/searchParks?state=${currentState}`)
      .then((results) => {
        if (results.status === 404) {
          dispatch({ type: 'SET_PARKS', parks: [] });
        }

        return results.json();
      })
      .then((fetchedParks) => {
        dispatch({ type: 'SET_PARKS', parks: fetchedParks });
        dispatch({ type: 'SET_PHASE', phase: 'DISPLAY' });
      });
  };

  return (
    <Box sx={{
      p: 4, height: 5 / 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <Typography
        variant='h3'
        noWrap
        component='div'
        sx={{ mx: '25%', mb: '5%' }}
      >
        Which state are you in?
      </Typography>

      <StateSelection />

      <Button
        variant='outlined'
        size='large'
        sx={{
          color: 'black', width: 1 / 5, mx: '25%', mb: '5%',
        }}
        onClick={handleConfirm}>
          Confirm
      </Button>
    </Box>
  );
};

export default UserInput;
