import React, { useContext } from 'react';
import { Select, MenuItem } from '@mui/material';
import { stateOptions, State } from '../../types/types';
import { mainContext } from '../../spaceObserverContext';

const StateSelection: React.FC = () => {
  const { dispatch } = useContext(mainContext);
  return (
    <Select
      sx={{
        width: 100, mx: '25%', mb: '5%', color: 'black', textAlign: 'center',
      }}
      onChange={(event) => { dispatch({ type: 'SET_STATE', currentState: event.target.value as State }); }}
      defaultValue='AL'
    >
      {stateOptions.map((state) => <MenuItem key={state} value={state}>{state}</MenuItem>)}
    </Select>
  );
};

export default StateSelection;
