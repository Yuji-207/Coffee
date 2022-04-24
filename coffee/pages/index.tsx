import React from 'react';
import type { NextPage } from 'next';
import { Params } from 'next/dist/server/router';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Step from '@interfaces/step'
import useInterval from '@hooks/useInterval';


const displayWeight = (weight: number): string => {
  const integer: number = Math.floor(weight);
  const decimal: number = Math.floor(weight % 1 * 10);
  const display: string = String(integer).padStart(3, '0') + '.' + String(decimal) + ' g';
  return display;
};


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


  const [steps, setSteps] = React.useState<Step[]>([{water: 0, time: 0}]);
  const [water, setWater] = React.useState<number>(0);
  const [time, setTime] = React.useState<number>(0);
  const [count, setCount] = React.useState<boolean>(false);


  const handleUpdate = () => {

    // 湯量と時間それぞれの合計
    const stepSum: Step = {water: 0, time:0};

    // カウンターストップ（59:59:99）
    if (time < 3599990) {
      setTime(time + 10)
    } else {
      setTime(3599990)
    };

    // 時刻から現在の目標湯量を計算
    for (const step of steps) {

      const stepTime: number = step.time * 1000;  // ミリ秒に変換

      if (time <= stepTime +  stepSum.time) {
        if (stepTime === 0) {
          setWater(step.water);
        } else {
          setWater((time - stepSum.time) / stepTime * step.water + stepSum.water);
        };
        break;
      } else {
        stepSum.water += step.water;
        stepSum.time += stepTime;
      };

    };

  };


  const [state, { start, stop }] = useInterval({
    interval: 10,
    onUpdate: handleUpdate
  });


  const handelChange = (e: any, i: number, type: 'water'|'time'): void => {

    const value: string = e.target.value;
  
    if (value !== '') {

      let num: number = Number(value);
      num = Math.floor(num * 10) / 10;  // 小数第二位を切り捨て
      num = Math.abs(num);

      e.target.value = String(num);

      const copiedSteps: Step[] = [...steps];
      copiedSteps[i][type] = num;
      setSteps(copiedSteps);

    }
    
  };


  const handleStart = (): void => {
    start();
    setCount(true);
  };


  const handleStop = (): void => {
    stop();
  };


  const handleReset = (): void => {
    stop();
    setCount(false);
    setWater(0);
    setTime(0);
  };


  const handleAdd = (): void => {
    const copiedSteps: Step[] = [...steps];
    copiedSteps.push({water: 0, time: 0});
    setSteps(copiedSteps);
  };


  const handleRemove = (): void => {
    const copiedSteps: Step[] = [...steps];
    copiedSteps.pop();
    setSteps(copiedSteps);
  };


  return (
    <Container>

      <Box m={2} pt={3}>
        <Typography variant="h1" align="center">{displayTime(time)}</Typography>
        <Typography variant="h2" align="center">{displayWeight(water)}</Typography>
      </Box>

      <Box>
        <Stack justifyContent="center" spacing={2}>
          {steps.map((step: Step, i: number) => (
            <>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <TextField
                  className="water"
                  type="number"
                  label={steps.length > 1 ? '湯量' + String(i + 1) : '湯量'}
                  placeholder="0"
                  onChange={e => handelChange(e, i, 'water')}
                />
                <TextField
                  className="time"
                  type="number"
                  label={steps.length > 1 ? '時間' + String(i + 1) : '時間'}
                  placeholder="0"
                  onChange={e => handelChange(e, i, 'time')}
                />
              </Stack>
              {i === steps.length - 1 && !count && (
                <div>
                  <IconButton onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                  {steps.length > 1 && (
                    <IconButton onClick={handleRemove}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </div>
              )}
            </>
          ))}
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="center" spacing={8}>
        <Button variant="contained">
          <RestartAltIcon  color="primary" onClick={handleReset} />
        </Button>
        {state === 'RUNNING' ? (
          <Button variant="contained">
            <PauseIcon  color="primary" onClick={handleStop} />
          </Button>
        ) : (
          <Button variant="contained">
            <PlayArrowIcon color="primary" onClick={handleStart} />
          </Button>
        )}
      </Stack>

    </Container>
  )
}


export default Home;
