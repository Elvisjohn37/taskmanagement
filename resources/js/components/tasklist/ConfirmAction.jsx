import React from "react";
import Button from "@mui/joy/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmAction = ({ children, confirmAction }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    confirmAction();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Move to Trash?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will be move to trash and can be deleted permanently either
            manually or within 30 days.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="soft" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="soft" color="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {children(setOpen)}
    </>
  );
};

export default ConfirmAction;
