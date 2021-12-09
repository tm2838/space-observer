import React, { useState } from 'react';
import {
  Box, Typography, Button, SelectChangeEvent,
} from '@mui/material';
import StateSelection from './stateSelection';

interface UserInputProps {
  handleParks: (a: object[]) => void
}

const UserInput: React.FC<UserInputProps> = ({ handleParks }) => {
  const [state, setState] = useState<string>('');

  const handleSelection = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  const handleConfirm = () => {
    fetch(`/searchParks?state=${state}`)
      .then((results) => results.json())
      .then((parks) => {
        handleParks(parks);
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

      <StateSelection onSelect={handleSelection}/>

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
