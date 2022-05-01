import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const displayTime = (time: number): string =>  {

  let centiNum: number = time % 1000;
  time -= centiNum;
  centiNum /= 10;
  
  let secondsNum: number = time % 60000;
  time -= secondsNum;
  secondsNum /= 1000;
  
  const minutesNum: number = time / 60000;

  const centi: string = String(centiNum).padStart(2, '0');
  const seconds: string = String(secondsNum).padStart(2, '0');
  const minutes: string = String(minutesNum).padStart(2, '0');

  return `${minutes}:${seconds}:${centi}`;
  
}


interface Props {
  time: number;
}


const Timer: React.FC<Props> = (props) => {
  const time: string = displayTime(props.time);
  return (
    <Box my={2}>
      <Typography variant="h2" component="p">{time}</Typography>
    </Box>
  );

}


export default Timer;
