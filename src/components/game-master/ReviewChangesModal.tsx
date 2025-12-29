import React from "react";
import { Box, Button, Modal, Typography, List, ListItem } from "@mui/material";
import { AbilityType, Character, LocalCharacterChangeData, CardData } from "../../utils/Types";

interface Props {
  open: boolean;
  changes: LocalCharacterChangeData[];
  selectedCards: CardData[];
  onClose: () => void;
  onConfirm: (changes: LocalCharacterChangeData[]) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  maxHeight: '80vh',
  overflow: 'auto' as 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

const describeChange = (c: LocalCharacterChangeData, selectedCards: CardData[]) => {
  const isWelded = c.character ? !!selectedCards.find(sc => sc.character === c.character)?.isWelded : false;
  switch (c.gameMasterActionType) {
    case 'TOGGLE_ALIVE_STATUS':
      return `${c.character} — Él: ${c.newValue ? 'IGEN' : 'NEM'}${isWelded ? ' — FIGYELEM: hegesztett karakter!' : ''}`;
    case 'TOGGLE_ABILITY_USED':
      return `${c.character} — ${c.abilityType ?? 'ABILITY'} használat beállítva: ${c.newValue}`;
    case 'CHANGE_WELD_STATUS':
      if (Array.isArray(c.newValue)) {
        return `Hegesztés változtatás: ${c.newValue[0]} ↔ ${c.newValue[1]}`;
      }
      return `Hegesztés változtatás: ${String(c.newValue)}`;
    default:
      return `${c.gameMasterActionType} — ${String(c.newValue)}`;
  }
};

const ReviewChangesModal: React.FC<Props> = ({ open, changes, selectedCards, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 12 }}>Változások áttekintése</Typography>
        <List dense>
          {changes.length === 0 && <ListItem>Nincsenek változtatások</ListItem>}
          {changes.map((c, idx) => (
            <ListItem key={idx} style={{ fontSize: 13 }}>
              {describeChange(c, selectedCards)}
            </ListItem>
          ))}
        </List>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
          <Button variant="contained" color="primary" onClick={() => onConfirm(changes)}>Alkalmaz</Button>
          <Button variant="outlined" onClick={onClose}>Mégse</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReviewChangesModal;