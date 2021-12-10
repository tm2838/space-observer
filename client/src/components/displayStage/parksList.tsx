import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Park } from '../../types/types';
import ParkCard from './parkCard';

interface ParksListProps {
  parks: Park[],
  state?: string,
  handleBack?: () => void,
}

const ParksList: React.FC<ParksListProps> = ({ parks, state, handleBack }) => (
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
          Parks in {state}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
        }}
      >
        {parks.map((park) => <ParkCard park={park} key={park.id} />)}
        {!parks.length
          && <Typography
          variant='h6'
          component='div'
          >
            No parks found.
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

export default ParksList;
