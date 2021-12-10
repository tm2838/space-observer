import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Park } from '../../types/types';
import ParkCard from './parkCard';

interface ParksListProps {
  parks: Park[],
  state?: string,
  handleBack?: () => void,
}

const ParksList: React.FC<ParksListProps> = ({ parks, state, handleBack }) => {
  const [activeIdx, setActiveIdx] = useState<number>(1);
  const [displayedParks, setDisplayedParks] = useState<Park[]>(parks.slice(0, 3));
  const showCarousel = parks.length > 3;

  const handleLeft = () => {
    if (activeIdx === parks.length - 1) {
      setActiveIdx(0);
    } else {
      setActiveIdx(activeIdx + 1);
    }
  };

  const handleRight = () => {
    if (activeIdx === 0) {
      setActiveIdx(parks.length - 1);
    } else {
      setActiveIdx(activeIdx - 1);
    }
  };

  useEffect(() => {
    if (showCarousel) {
      if (activeIdx === 0) {
        const parksToDisplay = [parks[parks.length - 1], ...parks.slice(0, 2)];
        setDisplayedParks(parksToDisplay);
      } else if (activeIdx === parks.length - 1) {
        const parksToDisplay = [...parks.slice(parks.length - 2), parks[0]];
        setDisplayedParks(parksToDisplay);
      } else {
        setDisplayedParks(parks.slice(activeIdx - 1, activeIdx + 2));
      }
    }
  }, [activeIdx, showCarousel]);

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
          Dark sky parks in {state}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
        }}
      >
        {showCarousel && <FontAwesomeIcon icon={faCaretLeft} onClick={handleLeft} size='2x' style={{ cursor: 'pointer' }}/>}
        {displayedParks.map((park) => <ParkCard park={park} key={park.id} />)}
        {showCarousel && <FontAwesomeIcon icon={faCaretRight} onClick={handleRight} size='2x' style={{ cursor: 'pointer' }}/>}
        {!parks.length
          && <Typography
          variant='h6'
          component='div'
          >
            No dark sky parks found in {state}.
          </Typography>
        }
      </Box>

      <Button
        variant='outlined'
        size='large'
        sx={{
          color: 'black', width: 1 / 5, mx: '25%', mb: '5%',
        }}
        onClick={handleBack}>
          Try Another State
      </Button>
    </Box>
  );
};

export default ParksList;
