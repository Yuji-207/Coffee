import React from 'react';
import type { NextPage } from 'next';
import { Params } from 'next/dist/server/router';
import Head from 'next/head';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import PauseIcon from '@mui/icons-material/Pause';

import useInterval from 'hooks/useInterval';


const Home: NextPage = ({ onUpdate }: Params) => {

  const [timer, setTimer] = React.useState<number>(0);
  const [state, { start, stop }] = useInterval({
    interval: 10,
    onUpdate: () => setTimer(timer + 1),
  })

  return (
    <>

      <Head>
        <title>Coffee</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <p>{timer}</p>

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

export default Home
