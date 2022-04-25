import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import Step from '@interfaces/step'
import TextField from '@mui/material/TextField';
import { geteuid } from 'process';


interface Props {
  steps: any;
  setSteps: any;
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
    
  }


  const handleAdd = (): void => {
    const copiedSteps: Step[] = [...steps];
    copiedSteps.push({water: 0, time: 0});
    setSteps(copiedSteps);
  }


  const handleRemove = (): void => {
    const copiedSteps: Step[] = [...steps];
    copiedSteps.pop();
    setSteps(copiedSteps);
  }


  const handleTimeField = async (e: any) => {

    let id: string = e.target.id.slice(5);
    const value: string = e.target.value;
    const key: any = e.key;
    
    if ((key === 'Enter' || key === 'Tab') && value !== '') {  // tabだと2ことぶ
      const timeField: any = document.getElementById('water-' + id);
      timeField.focus();
    } else if ((key === 'Backspace' || key === 'backspace') && value === '' && id !== '0') {  // backspace？
      await handleRemove();
      id = String(Number(id) - 1); 
      const timeField: any = document.getElementById('water-' + id);
      timeField.focus();
    }

  }


  const handleWaterField = async (e: any) => {

      let id: string = e.target.id.slice(6);
      const value: string = e.target.value;
      const key: any = e.key;
      
      if ((key === 'Enter' || key === 'Tab') && value !== '') {  // tabだと2ことぶ
        await handleAdd();
        id = String(Number(id) + 1);
        const waterField: any = document.getElementById('time-' + id);
        waterField.focus();
      } else if ((key === 'Backspace' || key === 'backspace') && value === '') {  // backspace？
        console.log(id)
        console.log('time-' + id)
        const waterField: any = document.getElementById('time-' + id);
        waterField.focus();
      }
  
    }
  

  return (
    <Stack className="m-5" spacing={3}>
      {steps.map((step: Step, i: number) => (
        <Box className="flex flex-row justify-center" key={i}>
          <Box className="flex-grow flex justify-end mr-2">
            <TextField
              id={'time-' + i}
              className="time"
              type="number"
              label={steps.length > 1 ? '時間' + String(i + 1) : '時間'}
              placeholder="0"
              onChange={e => handelChange(e, i, 'time')}
              onKeyDown={(e: any) => handleTimeField(e)}
            />
          </Box>
          <Box className="flex-grow flex justify-start ml-2">
            <TextField
              id={'water-' + i}
              className="water"
              type="number"
              label={steps.length > 1 ? '湯量' + String(i + 1) : '湯量'}
              placeholder="0"
              onChange={e => handelChange(e, i, 'water')}
              onKeyDown={(e: any) => handleWaterField(e)}
            />
            {/* {i === steps.length - 1 && (
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
            )} */}
          </Box>
        </Box>
      ))}
    </Stack>
  );

}


export default Steps;
