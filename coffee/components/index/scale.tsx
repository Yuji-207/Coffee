import React from 'react';

import Typography from '@mui/material/Typography';
import { ClassNames } from '@emotion/react';


const displayWeight = (weight: number): string => {
  const integer: number = Math.floor(weight);
  const decimal: number = Math.floor(weight % 1 * 10);
  const display: string = String(integer).padStart(3, '0') + '.' + String(decimal) + ' g';
  return display;
}


interface Props {
  weight: number;
  className?: string;
}


const Scale: React.FC<Props> = (props) => {
  const weight: string = displayWeight(props.weight);
  const className: string = props.className as string;
  return (
    <Typography className={className} variant="h1">{weight}</Typography>
  );
}


export default Scale;
