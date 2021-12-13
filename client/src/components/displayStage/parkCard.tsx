/* eslint-disable new-cap */
import React, { useState, useContext } from 'react';
import { Buffer } from 'buffer';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart, faCheckSquare as regularCheck } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart, faCheckSquare as solidCheck } from '@fortawesome/free-solid-svg-icons';
import { Park } from '../../types/types';
import { mainContext } from '../../spaceObserverContext';

interface ParkCardProps {
  park: Park,
}

const ParkCard: React.FC<ParkCardProps> = ({ park }) => {
  const { state: { mode }, dispatch } = useContext(mainContext);
  const { data } = park.imgBuffer;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = new (Buffer as any).from(data).toString('base64');

  const [visited, setVisited] = useState<boolean>(false);
  const [wantToGo, setWantToGo] = useState<boolean>(false);

  const handleVisit = () => {
    dispatch({ type: 'SET_VISITED', park });
    setVisited(!visited);
  };

  const handleWantToGo = () => {
    dispatch({ type: 'SET_WISHLIST', park });
    setWantToGo(!wantToGo);
  };

  return (
      <Box
        sx={{
          p: 4, height: '250px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
        }}
        borderColor='#fff'
      >
        <a href={park.webpage} style={{ textDecoration: 'none', color: 'black' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={`data:'image/png';base64,${img}`} alt={park.name} height='150px' width='240px' style={{ marginLeft: 'auto', marginRight: 'auto' }}/>
            <Typography
              variant='h6'
              component='div'
            >
              {park.name}
            </Typography>
          </Box>
        </a>
        <Box sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%',
        }}>
          { mode === 'PARKS' && !wantToGo
            && <FontAwesomeIcon icon={regularHeart} style={{ cursor: 'pointer' }} onClick={handleWantToGo} />
          }
          { ((mode === 'PARKS' && wantToGo) || (mode === 'WISHLIST'))
            && <FontAwesomeIcon icon={solidHeart} style={{ cursor: 'pointer' }} onClick={handleWantToGo} />
          }
          { mode === 'PARKS' && !visited
            && <FontAwesomeIcon icon={regularCheck} style={{ cursor: 'pointer' }} onClick={handleVisit}/>
          }
          { ((mode === 'PARKS' && visited) || (mode === 'VISITED'))
            && <FontAwesomeIcon icon={solidCheck} style={{ cursor: 'pointer' }} onClick={handleVisit}/>
          }
        </Box>
      </Box>
  );
};

export default ParkCard;
