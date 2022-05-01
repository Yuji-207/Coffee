import React from 'react';

import Box from '@mui/material/Box';

import Scale from '@components/index/scale';
import Timer from '@components/index/timer';


type Props = {
  time: number;
  weight: number;
}
  
  
const Display: React.FC<Props> = (props) => {

  const time: number = props.time;
  const weight: number = props.weight;

  return (
    <Box id="display" m={3}>
      <Scale weight={weight} />
      <Timer time={time} />
    </Box>
  );

}


export default Display;
