/* eslint-disable new-cap */
import React from 'react';
import { Buffer } from 'buffer';
import { Box, Typography } from '@mui/material';
import { Park } from '../../types/types';

interface ParkCardProps {
  park: Park,
}

const ParkCard: React.FC<ParkCardProps> = ({ park }) => {
  const { data } = park.imgBuffer;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = new (Buffer as any).from(data).toString('base64');

  return (
    <a href={park.webpage} style={{ textDecoration: 'none', color: 'black' }}>
      <Box
        sx={{
          p: 4, height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
        }}
        borderColor='#fff'
      >
        <img src={`data:'image/png';base64,${img}`} alt={park.name} height='150px' width='240px' style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
        <Typography
          variant='h6'
          component='div'
        >
          {park.name}
        </Typography>
      </Box>
    </a>
  );
};

export default ParkCard;
