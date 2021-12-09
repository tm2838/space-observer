import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { stateOptions } from '../../types/types';

interface StateSelectionProps {
  onSelect: (event: SelectChangeEvent) => void;
}

const StateSelection: React.FC<StateSelectionProps> = ({ onSelect }) => (
    <Select
      sx={{
        width: 100, mx: '25%', mb: '5%', color: 'black', textAlign: 'center',
      }}
      onChange={onSelect}
    >
      {stateOptions.map((state) => <MenuItem key={state} value={state}>{state}</MenuItem>)}
    </Select>
);

export default StateSelection;
