import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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


  const handleStart = (): void => {
    start();
    setButton('stop');
  };


  const handleStop = (): void => {
    stop();
    setButton('reset');
  };


  const handleReset = (): void => {
    stop();
    setWater(0);
    setTime(0);
    setButton('start');
  };


  return (
    <>
      <Header />
      <Box className="container mx-auto  justify-center text-center">
        <Display time={time} weight={water} />
        <Steps steps={steps} setSteps={setSteps} />
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
