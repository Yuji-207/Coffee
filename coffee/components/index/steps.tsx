import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Step from '@interfaces/step'
import TextField from '@mui/material/TextField';


interface Props {
  steps: any;
  setSteps: any;
  count: boolean;
}


const Steps: React.FC<Props> = (props) => {


  const steps: any = props.steps;
  const setSteps: any = props.setSteps;


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
    <Stack className="m-5" spacing={3}>
      {steps.map((step: Step, i: number) => (
        <Box className="flex flex-row justify-center">
          <Box className="flex-grow flex justify-end mr-2">
            <TextField
              className="time"
              type="number"
              label={steps.length > 1 ? '時間' + String(i + 1) : '時間'}
              placeholder="0"
              onChange={e => handelChange(e, i, 'time')}
            />
          </Box>
          <Box className="flex-grow flex justify-start ml-2">
            <TextField
              className="water"
              type="number"
              label={steps.length > 1 ? '湯量' + String(i + 1) : '湯量'}
              placeholder="0"
              onChange={e => handelChange(e, i, 'water')}
            />
            {i === steps.length - 1 && (
              <Box className="relative">
                <Box className="absolute h-full flex">
                  <Box className="flex flex-row self-center">
                    <IconButton onClick={handleAdd}>
                      <AddIcon fontSize="large" />
                    </IconButton>
                    {steps.length > 1 && (
                      <IconButton onClick={handleRemove}>
                        <RemoveIcon fontSize="large" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );

};


export default Steps;
