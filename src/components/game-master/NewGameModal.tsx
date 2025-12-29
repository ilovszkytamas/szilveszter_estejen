import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface Props {
  buttonLabel?: string;
  buttonStyle?: React.CSSProperties;
  title?: string;
  description?: string;
  onConfirm: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NewGameModal: React.FC<Props> = ({
  buttonLabel = 'ÚJ JÁTÉK KEZDÉSE',
  buttonStyle,
  title = 'Új játék kezdése',
  description = 'Biztos hogy új játékot szeretnél kezdeni?',
  onConfirm,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} style={buttonStyle}>
        {buttonLabel}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: 20 }}>
            {title}
          </Typography>
          <Typography style={{ textAlign: 'center', marginBottom: 20 }}>
            {description}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20 }}>
            <Button
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Igen
            </Button>
            <Button onClick={() => setOpen(false)} style={{ backgroundColor: 'grey', color: 'white' }}>
              Nem
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NewGameModal;