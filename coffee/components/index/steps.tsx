import React from 'react';

import Box from '@mui/material/Box';
import Step from '@interfaces/step'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


interface Props {
  readOnly: boolean;
}


const Steps: React.FC<Props> = (props) => {

  
  const readOnly: boolean = props.readOnly;

  const [tooltipTitle, setTooltipTitle] = React.useState<string>('');
  const [steps, setSteps] = React.useState<Step[]>([{water: 0, time: 0}]);


  React.useEffect(() => {
    if (readOnly) {
      setTooltipTitle('抽出開始後は編集できません')
    } else {
      setTooltipTitle('');
    }
  }, [readOnly]);


  const validateNumber = (e: any, i: number, type: 'water'|'time'): void => {

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


  const handleWaterChange = (e: any, i: number): void => {

    const value: string = e.target.value;
    validateNumber(e, i, 'water');

    if (value === '') {
      setTooltipTitle('削除ボタンで前に戻れます');
    } else if(value !== '') {
      setTooltipTitle('改行ボタンでステップを追加できます');
    }

  }


  const handleTimeChange = (e: any, i: number): void => {

    const value: string = e.target.value;
    validateNumber(e, i, 'time');

    if (value === '' && i > 0) {
      setTooltipTitle('削除ボタンでステップを削除できます');
    } else if (value !== '') {
      setTooltipTitle('改行ボタンで移動できます');
    } else {
      setTooltipTitle('');
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
      setTooltipTitle('')
      timeField.focus();
    } else if ((key === 'Backspace' || key === 'backspace') && value === '' && id !== '0') {  // backspace？
      await removeStep();
      id = String(Number(id) - 1); 
      const timeField: any = document.getElementById('water-' + id);
      setTooltipTitle('')
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
        setTooltipTitle('削除ボタンでステップを削除できます')
        waterField.focus();
      } else if ((key === 'Backspace' || key === 'backspace') && value === '') {  // backspace？
        console.log(id)
        console.log('time-' + id)
        const waterField: any = document.getElementById('time-' + id);
        setTooltipTitle('')
        waterField.focus();
      }
  
    }

  return (
    <Box className="m-5" >
      {steps.map((step: Step, i: number) => (
        <Box className="step flex flex-row justify-center m-5" key={i}>
          <Tooltip title={tooltipTitle} arrow>
            <TextField
              id={'time-' + i}
              className="mr-2"
              type="number"
              label="注入時間（秒）"
              placeholder="0"
              helperText={i + 1 + '投目'}
              onChange={e => handleTimeChange(e, i)}
              onKeyDown={(e: any) => handleTimeField(e)}
              InputProps={{
                readOnly: readOnly ? true : false,
              }}
            />
          </Tooltip>
          <Tooltip title={tooltipTitle}  arrow>
            <TextField
              id={'water-' + i}
              className="ml-2"
              type="number"
              label="注入量（g）"
              placeholder="0"
              onChange={e => handleWaterChange(e, i)}
              onKeyDown={(e: any) => handleWaterField(e)}
              InputProps={{
                readOnly: readOnly ? true : false,
              }}
            />
            </Tooltip>
        </Box>
      ))}
    </Box>
  );

}


export default Steps;
