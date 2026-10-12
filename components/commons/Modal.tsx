import React, { ReactNode } from 'react';
import { Box, Modal as MuiModal } from '@mui/material';
import Container from '../statics/dashboard/Container';

interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    fullWidth?: boolean;
    disableEnforceFocus?: boolean;
    disableAutoFocus?: boolean;
}

const Modal = ({ open, onClose, children, fullWidth = false, disableAutoFocus = false, disableEnforceFocus = false }: Props) => {
    return (
        <MuiModal disableAutoFocus={disableAutoFocus} disableEnforceFocus={disableEnforceFocus} open={open} onClose={onClose} className="grid items-center h-screen overflow-y-auto justify-center py-2">
            <Box>
                <Container className={`${!fullWidth ? 'min-[450px]:w-[400px]' : ''} w-[calc(100vw-20px)]`}>
                    {children}
                </Container>
            </Box>
        </MuiModal>
    );
};

export default Modal;
