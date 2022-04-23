import React from 'react';
import type { NextPage } from 'next';
import { Params } from 'next/dist/server/router';

import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import PauseIcon from '@mui/icons-material/Pause';

import useInterval from 'hooks/useInterval';


const displayTime = (time: number): string =>  {

  let centi: number | string = time % 1000;
  time -= centi;
  centi /= 10;
  centi = String(centi).padStart(2, '0');

  let seconds: number | string = time % 60000;
  time -= seconds;
  seconds /= 1000;
  seconds = String(seconds).padStart(2, '0');

  let minutes: number | string = time / 60000;
  minutes = String(minutes).padStart(2, '0');

  return `${minutes}:${seconds}:${centi}`;

}


const Home: NextPage = ({ onUpdate }: Params) => {

  const [timer, setTimer] = React.useState<number>(0);
  const [state, { start, stop }] = useInterval({
    interval: 10,
    onUpdate: () => timer < 3599990 ? setTimer(timer + 10): setTimer(3599990),  // 59:59:99
  })

  return (
    <>

      <p>{displayTime(timer)}</p>

      <Button variant="contained">
        <RefreshIcon  color="primary" onClick={() => {stop(); setTimer(0);}} />
      </Button>

      {state === 'RUNNING' ? (
        <Button variant="contained">
          <PauseIcon  color="primary" onClick={stop} />
        </Button>
      ) : (
        <Button variant="contained">
          <PlayArrowIcon color="primary" onClick={start} />
        </Button>
      )}

    </>
  )
}

export default Home;
