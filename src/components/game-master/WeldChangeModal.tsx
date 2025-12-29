import React from "react";
import { Box, Button, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CardData, Character } from '../../utils/Types';

interface Props {
  open: boolean;
  selectedCards: CardData[];
  onClose: () => void;
  onConfirm: (pair: { first: Character; second: Character }) => void;
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

const WeldChangeModal: React.FC<Props> = ({ open, selectedCards, onClose, onConfirm }) => {
  const [first, setFirst] = React.useState<Character | ''>('');
  const [second, setSecond] = React.useState<Character | ''>('');

  const handleConfirm = () => {
    if (first && second && first !== second) onConfirm({ first, second });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 16 }}>Hegesztés megváltoztatása</Typography>

        <FormControl fullWidth style={{ marginBottom: 12 }}>
          <InputLabel>Első</InputLabel>
          <Select value={first} label="Első" onChange={(e) => setFirst(e.target.value as Character)}>
            {selectedCards.map(c => <MenuItem key={c.character} value={c.character}>{`${c.character} — ${c.playerName}`}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: 16 }}>
          <InputLabel>Második</InputLabel>
          <Select value={second} label="Második" onChange={(e) => setSecond(e.target.value as Character)}>
            {selectedCards.map(c => <MenuItem key={c.character} value={c.character}>{`${c.character} — ${c.playerName}`}</MenuItem>)}
          </Select>
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button onClick={() => { handleConfirm(); onClose(); }} disabled={!first || !second || first === second} variant="contained" color="primary">Alkalmaz</Button>
          <Button onClick={onClose} variant="outlined">Mégse</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default WeldChangeModal;