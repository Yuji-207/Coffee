import React from 'react';

import Box from '@mui/material/Box';
import Step from '@interfaces/step'
import TextField from '@mui/material/TextField';


const Steps: React.FC = () => {


  const [steps, setSteps] = React.useState<Step[]>([{water: 0, time: 0}]);


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


  const addStep = (): void => {
    const copiedSteps: Step[] = [...steps];
    copiedSteps.push({water: 0, time: 0});
    setSteps(copiedSteps);
  }


  const removeStep = (): void => {
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
      await removeStep();
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
        await addStep();
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
    <Box className="m-5" >
      {steps.map((step: Step, i: number) => (
        <Box className="step flex flex-row justify-center m-5" key={i}>
          <TextField
            id={'time-' + i}
            className="mr-2"
            type="number"
            label={steps.length > 1 ? '時間' + String(i + 1) : '時間'}
            placeholder="0"
            onChange={e => handelChange(e, i, 'time')}
            onKeyDown={(e: any) => handleTimeField(e)}
          />
          <TextField
            id={'water-' + i}
            className="ml-2"
            type="number"
            label={steps.length > 1 ? '湯量' + String(i + 1) : '湯量'}
            placeholder="0"
            onChange={e => handelChange(e, i, 'water')}
            onKeyDown={(e: any) => handleWaterField(e)}
          />
        </Box>
      ))}
    </Box>
  );

}


export default Steps;
