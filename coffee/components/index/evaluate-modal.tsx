import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '100vw',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};


interface Props {
  open: boolean;
  setOpen: any;
}


const EvaluateModal: React.FC<Props> = (props) => {


  const open: boolean = props.open;
  const setOpen: any = props.setOpen;

  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  const closeModal = (): void => {
    setOpen(false);
  }


  const labels: { [index: string]: string } = {
    1: 'Useless+',
    2: 'Poor+',
    3: 'Ok+',
    4: 'Good+',
    5: 'Excellent+',
  };


  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box m={3} sx={style}>
        <Typography variant="h6" m={3}>レシピを評価してください。</Typography>
        <Box m={3}>
          <Rating
            name="simple-controlled"
            value={value}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <Stack m={3} spacing={2}>
          <Button variant="contained">評価する</Button>
          <Button variant="outlined" onClick={closeModal}>測りなおす</Button>
        </Stack>
      </Box>
    </Modal>
  );


}


export default EvaluateModal;
