import React from 'react';

import Box from '@mui/material/Box';

import Scale from '@components/index/scale';
import Timer from '@components/index/timer';


type Props = {
  time: number;
  weight: number;
};
  
  
const Display: React.FC<Props> = (props) => {

  const time: number = props.time;
  const weight: number = props.weight;

  return (
    <Box className="p-5 m-5">
      <Timer className="m-5" time={time} />
      <Scale className='m-5' weight={weight} />
    </Box>
  );

};


export default Display;
