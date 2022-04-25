import React from 'react';

import Typography from '@mui/material/Typography';


const displayWeight = (weight: number): string => {
  const integer: number = Math.floor(weight);
  const decimal: number = Math.floor(weight % 1 * 10);
  const display: string = String(integer).padStart(3, '0') + '.' + String(decimal) + ' g';
  return display;
};


  type Props = {
    weight: number;
  };


  const Scale: React.FC<Props> = (props) => {
    const weight: string = displayWeight(props.weight);
    return (
      <Typography variant="h2">{weight}</Typography>
    );
  };


  export default Scale;
