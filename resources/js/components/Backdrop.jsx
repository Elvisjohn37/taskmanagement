import * as React from "react";
import { Backdrop as MuiBackdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function Backdrop({ isOpen }) {
  return (
    <MuiBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
}
