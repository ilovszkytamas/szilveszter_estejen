import { Box, Button, Modal, Typography } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Character } from '../../utils/Types';
import useCharacterAction from '../../hooks/useCharacterAction';

export const StepModal: React.FC = () => {
    const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
    const { state, dispatch } = React.useContext(GameContext);
    const { hitAction } = useCharacterAction()

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
        //let donfater = state.selectedCards.find(card => card.character === Character.DONFATER1);
        //donfater?.abilities![0].abilityMethod(state.selectedCards[10]);
        //hitAction(donfater?.abilities![0]!, state.selectedCards[10])
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <>
            <Button onClick={handleOpen}>KARAKTER_DÖNTÉSEK</Button>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" style={{ display: 'flex' }}>
                        <Button style={{ backgroundColor: 'black', color: 'white' }}>BUTTON</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}