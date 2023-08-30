
import React from 'react'
import { HrnetModal } from "oc14-simple-react-modal-plugin"

export default function Moodal({ open, handleClose, message, action, title }) {
    const handleCloseClick = () => {
        handleClose();
    }
    const handleActionClick = () => {
        action()
    }
    return(
        <HrnetModal
            open={open}
            setOpen={handleCloseClick}
            title={title}
            titleColor={''}
            message={message}
            backdropBg={'rgba(15,19,26,.8)'}
            modalBg={'#292d33'}
            xCloseColor={'#a4a9b3'}
            modalWidth={'400'}
            okButton={true}
            okButtonColor={'#fff'}
            okButtonColorHover={'#fff'}
            okButtonBg={'#596e07'}
            okButtonBgHover={'#6c830e'}
            okButtonAction={handleActionClick}
            cancelButton={true}
            cancelButtonColor={'#a4a9b3'}
            cancelButtonColorHover={'#e9ebf0'}
            cancelButtonBg={'transparent'}
            cancelButtonBgHover={'#5c6066'}
        />
        // <Modal open={open} onClose={handleClose} size="xs" style={{ margin: '20vh auto' }}>
        //     <Modal.Header>
        //         <Modal.Title></Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         {message}
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button
        //             id='okButton'
        //             onClick={() => {handleActionClick(); handleCloseClick()}}
        //             appearance="primary">
        //             Ok
        //         </Button>
        //         <Button onClick={handleClose} appearance="subtle">
        //             Cancel
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
    )
}