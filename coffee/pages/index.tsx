import React from 'react';
import type { NextPage } from 'next';
import { Params } from 'next/dist/server/router';
import Head from 'next/head';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import StopIcon from '@mui/icons-material/Stop';

import useInterval from 'hooks/useInterval';


const Home: NextPage = ({ onUpdate }: Params) => {

  const [timer, setTimer] = React.useState<number>(0);
  const [state, { start, stop }] = useInterval({
    interval: 10,
    onUpdate: () => {
      // A function to be executed every delay milliseconds.
      setTimer(timer + 1);
    },
    // This flag is for start `interval execution` automatically on mount.
    autostart: false,
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
        <PlayArrowIcon color="primary" onClick={start} />
      </Button>
      <Button variant="contained">
        <StopIcon  color="primary" onClick={stop} />
        </Button>
      <Button variant="contained">
        <RestartAltIcon  color="primary" />
      </Button>

    </>
  )
}

export default Home
