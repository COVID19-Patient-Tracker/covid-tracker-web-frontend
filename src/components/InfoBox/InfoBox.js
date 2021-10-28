import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useState } from 'react'

export default function InfoBox({props}) {

    const {infoMessage,progress} = props;
    const [open, setOpen] = useState(true)

    const handleClose = (event, reason) => {
      setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
                <Alert variant="filled" severity="info">
                    {progress ? < CircularProgress size={20}/> : null} {infoMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
