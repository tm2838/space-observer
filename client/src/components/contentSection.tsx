import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  Phase, Park, States, Mode,
} from '../types/types';
import UserInput from './inputStage/userInput';
import ParksList from './displayStage/parksList';
import Loading from './loadingStage/loading';

interface ContentSectionProps {
  mode: Mode,
  phase: Phase,
  handlePhaseChange: (a: Phase) => void,
  handleModeChange: (a: Mode) => void,
}

const ContentSection: React.FC<ContentSectionProps> = ({
  phase, mode, handleModeChange, handlePhaseChange,
}) => {
  const [parks, setParks] = useState<Park[]>([]);
  const [state, setState] = useState<string>('');
  const [wishList, setWishList] = useState<Park[]>([]);
  const [visited, setVisited] = useState<Park[]>([]);

  const handleParks = (fetchedParks: Park[]) => {
    setParks(fetchedParks);
    handlePhaseChange('DISPLAY');
  };

  const handleState = (currentState: States) => {
    setState(currentState);
    handlePhaseChange('LOADING');
  };

  const handleBack = () => {
    handlePhaseChange('INPUT');
  };

  const handleWishList = (likedPark: Park) => {
    setWishList([...wishList, likedPark]);
  };

  const handleVisited = (visitedPark: Park) => {
    setVisited([...visited, visitedPark]);
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
      {phase === 'INPUT' && <UserInput handleParks={handleParks} handleState={handleState} handleModeChange={handleModeChange} />}
      {phase === 'DISPLAY' && mode === 'PARKS' && <ParksList parks={parks} state={state} handleBack={handleBack} handleWishList={handleWishList} handleVisited={handleVisited} mode={mode} />}
      {phase === 'DISPLAY' && mode === 'WISHLIST' && <ParksList parks={wishList} state={state} handleBack={handleBack} handleWishList={handleWishList} handleVisited={handleVisited} mode={mode} />}
      {phase === 'DISPLAY' && mode === 'VISITED' && <ParksList parks={visited} state={state} handleBack={handleBack} handleWishList={handleWishList} handleVisited={handleVisited} mode={mode} />}
      {phase === 'LOADING' && <Loading state={state} />}
    </Box>
  );
};

export default ContentSection;
