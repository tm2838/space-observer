import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import UserInput from './inputStage/userInput';
import ParksList from './displayStage/parksList';
import Loading from './loadingStage/loading';
import { mainContext } from '../spaceObserverContext';

const ContentSection: React.FC = () => {
  const {
    state: {
      phase, parks, wishList, visited,
    },
  } = useContext(mainContext);

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
      {phase === 'INPUT' && <UserInput />}
      {phase === 'DISPLAY'
      && <Routes>
          <Route path='/' element={<ParksList parks={parks} />} />
          <Route path='wishlist' element={<ParksList parks={wishList} />} />
          <Route path='visited' element={<ParksList parks={visited} />} />
        </Routes>
      }
      {phase === 'LOADING' && <Loading />}
    </Box>
  );
};

export default ContentSection;
