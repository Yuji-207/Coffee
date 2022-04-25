import React from 'react';

import Box from '@mui/material/Box';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Display from '@components/index/display';
import Footer from '@components/footer';
import Header from '@components/header';
import Steps from '@components/index/steps';

import Step from '@interfaces/step'
import useInterval from '@hooks/useInterval';


const Home: React.FC<void> = () => {


  const [steps, setSteps] = React.useState<Step[]>([{water: 0, time: 0}]);
  const [water, setWater] = React.useState<number>(0);
  const [time, setTime] = React.useState<number>(0);
  const [button, setButton]= React.useState<'start'|'stop'|'reset'>('start');


  const handleUpdate = () => {

    // 湯量と時間それぞれの合計
    const stepSum: Step = {water: 0, time:0}

    // カウンターストップ（59:59:99）
    if (time < 3599990) {
      setTime(time + 10)
    } else {
      setTime(3599990)
    }

    // 時刻から現在の目標湯量を計算
    for (const step of steps) {

      const stepTime: number = step.time * 1000;  // ミリ秒に変換

      if (stepTime === 0) {
        setWater(step.water + stepSum.water);
        break;
      } else if (time <= stepTime +  stepSum.time) {
        setWater((time - stepSum.time) / stepTime * step.water + stepSum.water);
        break;
      } else {
        stepSum.water += step.water;
        stepSum.time += stepTime;
      };

    };

  }


  const [state, { start, stop }] = useInterval({
    interval: 10,
    onUpdate: handleUpdate
  });


  const getValueById = (id: string): string => {
    const element: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    return element.value;
  }


  const getSteps = (): Step[] => {
    
    const stepLength: any = document.getElementsByClassName('step').length;
    const steps: Step[] = [];

    for (let i = 0; i < stepLength; i++) {
      const water: number = Number(getValueById('water-' + i));
      const time: number = Number(getValueById('time-' + i));
      const step: Step = {water: water, time: time};
      steps.push(step);
    }

    return steps;

  }


  const handleStart = (): void => {
    setSteps(getSteps());
    start();
    setButton('stop');
  }


  const handleStop = (): void => {
    stop();
    setButton('reset');
  }


  const handleReset = (): void => {
    stop();
    setWater(0);
    setTime(0);
    setButton('start');
  }


  return (
    <>
      <Header />
      <Box className="container mx-auto  justify-center text-center">
        <Display time={time} weight={water} />
        <Steps readOnly={button !== 'start'} />
      </Box>
      <Footer>
        {button == 'start' ? (
          <PlayArrowIcon onClick={handleStart} />
        ) : button == 'stop' ? (
          <StopIcon onClick={handleStop} />
        ) : (
          <RestartAltIcon onClick={handleReset} />
        )}
      </Footer>
    </>
  )
}


export default Home;
