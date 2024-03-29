import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export interface IStyle {
  content?: React.CSSProperties;
  title?: React.CSSProperties;
  actions?: React.CSSProperties;
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
  style?: IStyle;
}

/**
 * CustomDialog component is used to show the custom dialog
 */
const CustomDialog = ({
  open,
  onClose,
  title,
  content,
  buttons,
  style,
}: DialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ ...style?.title }}>{title}</DialogTitle>
      <DialogContent sx={{ ...style?.content }}>{content}</DialogContent>
      <DialogActions sx={{ ...style?.actions }}>
        {/* Render any buttons you want here */}
        <Button onClick={onClose}>Close</Button>
        {buttons}
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(CustomDialog);
