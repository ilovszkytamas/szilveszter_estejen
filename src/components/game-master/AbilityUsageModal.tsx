import React from "react";
import { Box, Button, Modal, Typography, FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Switch } from '@mui/material';
import { AbilityType, CardData, Character } from '../../utils/Types';

interface Props {
  open: boolean;
  selectedCards: CardData[];
  onClose: () => void;
  onConfirm: (payload: { character: Character; abilityKey: AbilityType; newValue: number }) => void;
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

const AbilityUsageModal: React.FC<Props> = ({ open, selectedCards, onClose, onConfirm }) => {
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character | ''>('');
  const [abilityKey, setAbilityKey] = React.useState<AbilityType | ''>('');
  const [value, setValue] = React.useState<number>(0);
  const [bosszuEnabled, setBosszuEnabled] = React.useState<boolean>(true);
  const [demonDiedOnce, setDemonDiedOnce] = React.useState<boolean>(false);

  const allowed = selectedCards.filter(c =>
    c.character === Character.KOTYVASZTÓ1 ||
    c.character === Character.KOTYVASZTÓ2 ||
    c.character === Character.BOSSZUALLO ||
    c.character === Character.DEMONDOSZPOD
  );

  const selectedCard = allowed.find(c => c.character === selectedCharacter);

  const isKotyv = selectedCharacter === Character.KOTYVASZTÓ1 || selectedCharacter === Character.KOTYVASZTÓ2;
  const isBosszu = selectedCharacter === Character.BOSSZUALLO;
  const isDemon = selectedCharacter === Character.DEMONDOSZPOD;

  const getUsage = (type: AbilityType) => {
    return selectedCard?.abilities?.find(a => a.abilityType === type)?.usageCountTotal ?? 0;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: 16 }}>Ability használat módosítása</Typography>

        <FormControl fullWidth style={{ marginBottom: 12 }}>
          <InputLabel>Karakter</InputLabel>
          <Select value={selectedCharacter} label="Karakter" onChange={(e) => {
            setSelectedCharacter(e.target.value as Character);
            setAbilityKey('');
            setValue(0);
          }}>
            {allowed.map(c => <MenuItem key={c.character} value={c.character}>{`${c.character} — ${c.playerName ?? ''}`}</MenuItem>)}
          </Select>
        </FormControl>

        {isKotyv && (
          <>
            <FormControl fullWidth style={{ marginBottom: 12 }}>
              <InputLabel>Ability</InputLabel>
              <Select value={abilityKey} label="Ability" onChange={(e) => {
                const k = e.target.value as AbilityType;
                setAbilityKey(k);
                setValue(getUsage(k));
              }}>
                <MenuItem value={AbilityType.ALKIMISTA_BOMBA}>
                  {`ALKIMISTA_BOMBA`}
                </MenuItem>
                <MenuItem value={AbilityType.ALKIMISTA_GYOGYITAL}>
                  {`ALKIMISTA_GYOGYITAL`}
                </MenuItem>
                <MenuItem value={AbilityType.ALKIMISTA_SZIKLABOR}>
                  {`ALKIMISTA_SZIKLABOR`}
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Jelenlegi használat"
              value={abilityKey ? getUsage(abilityKey as AbilityType) : 0}
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <TextField
              fullWidth
              label="Új használatszám"
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', 'aria-label': 'Új használatszám' }}
              value={value}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '');
                setValue(v === '' ? 0 : Number(v));
              }}
            />
          </>
        )}

        {isBosszu && (
          <FormControlLabel
            control={<Switch checked={bosszuEnabled} onChange={(e) => setBosszuEnabled(e.target.checked)} />}
            label="Bosszúálló kill engedélyezve"
            style={{ marginTop: 12 }}
          />
        )}

        {isDemon && (
          <FormControlLabel
            control={<Switch checked={demonDiedOnce} onChange={(e) => setDemonDiedOnce(e.target.checked)} />}
            label="Démon Doszpod már egyszer meghalt"
            style={{ marginTop: 12 }}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 }}>
          <Button onClick={() => {
            if (!selectedCharacter) return;
            const card = selectedCards.find(c => c.character === selectedCharacter);
            if (!card) return;

            if (isKotyv && abilityKey) {
              onConfirm({ character: card.character, abilityKey, newValue: value });
              onClose();
              return;
            }

            if (isBosszu) {
              onConfirm({ character: card.character, abilityKey: AbilityType.BOSSZUALLO_KILL, newValue: bosszuEnabled ? 1 : 0 });
              onClose();
              return;
            }

            if (isDemon) {
              onConfirm({ character: card.character, abilityKey: AbilityType.DEMONDOSZPOD_TULELES, newValue: demonDiedOnce ? 1 : 0 });
              onClose();
              return;
            }
          }} variant="contained" color="primary">Alkalmaz</Button>
          <Button onClick={onClose} variant="outlined">Mégse</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AbilityUsageModal;