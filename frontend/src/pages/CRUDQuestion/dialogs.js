/* eslint-disable react/prop-types */

import React from "react";
import { Box } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const DeleteQuestionConfirmationDialog = ({ isOpened, onClose, onDeleteClicked }) => {
    const boxStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        border: "2px solid #000",
        textAlign: "center",
        backgroundColor: "beige",
        p: 4
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpened}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isOpened}>
                <Box sx={boxStyle}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Delete this question?
                    </Typography>
                    <div className="question-page-dialog-button-group">
                        <button className="question-page-dialog-button" onClick={onDeleteClicked}>
                            Delete
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

const UnsavedChangesConfirmationDialog = ({
    isOpened,
    onClose,
    onSaveClicked,
    onDiscardClicked
}) => {
    const boxStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        border: "2px solid #000",
        textAlign: "center",
        backgroundColor: "beige",
        p: 4
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpened}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isOpened}>
                <Box sx={boxStyle}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        You have unsaved changes
                    </Typography>
                    <div className="question-page-dialog-button-group">
                        <button className="question-page-dialog-button" onClick={onSaveClicked}>
                            Save
                        </button>
                        <button className="question-page-dialog-button" onClick={onDiscardClicked}>
                            Discard
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default {
    DeleteQuestionConfirmationDialog,
    UnsavedChangesConfirmationDialog
};
