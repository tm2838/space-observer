import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Phase, Park, States } from '../types/types';
import UserInput from './inputStage/userInput';
import ParksList from './displayStage/parksList';

const ContentSection: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('INPUT');
  const [parks, setParks] = useState<Park[]>([]);
  const [state, setState] = useState<string>('');

  const handleParks = (fetchedParks: Park[]) => {
    setParks(fetchedParks);
    setPhase('DISPLAY');
  };

  const handleState = (currentState: States) => {
    setState(currentState);
  };

  const handleBack = () => {
    setPhase('INPUT');
  };

  return (
    <Box
      sx={{
        mx: '22%',
        my: '8%',
        p: 8,
        width: 4 / 8,
        height: 4 / 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {phase === 'INPUT' && <UserInput handleParks={handleParks} handleState={handleState} />}
      {phase === 'DISPLAY' && <ParksList parks={parks} state={state} handleBack={handleBack} />}
    </Box>
  );
};

export default ContentSection;
