import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Phase } from '../types/types';
import UserInput from './inputStage/userInput';

const ContentSection: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('INPUT');
  const [parks, setParks] = useState<object[]>([]);

  const handleParks = (fetchedParks: object[]) => {
    if (fetchedParks.length) {
      setParks(fetchedParks);
      setPhase('DISPLAY');
    }
  };

  return (
    <Box
      sx={{
        mx: '22%',
        my: '8%',
        p: 8,
        width: 4 / 8,
        height: 4 / 8,
        backgroundColor: '#fff',
        opacity: [0, 0, 0.5],
      }}
    >
      {phase === 'INPUT' && <UserInput handleParks={handleParks} />}
      {phase === 'DISPLAY' && parks && <></>}
    </Box>
  );
};

export default ContentSection;
