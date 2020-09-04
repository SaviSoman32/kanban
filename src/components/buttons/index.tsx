import React from 'react';
import IconButton, { IconButtonProps as MuiIconButtonProps } from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';


export const OptionsButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><MoreHorizIcon {...iconProps} /></IconButton>;

export const EditButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><EditIcon fontSize="small" {...iconProps} /></IconButton>;

export const CloseButton = ({ iconProps, ...props }: IconButtonProps) =>
  <IconButton {...props}><CloseIcon {...iconProps} /></IconButton>;

export interface ConfirmationProps {
  onCancel: () => void,
  onConfirm: () => void,
  cancelLabel?: string,
  confirmLabel?: string,
  confirmColor?: 'secondary' | 'secondary'
}

export function ConfirmationButtons({
  onCancel,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Done',
  confirmColor = 'secondary'
}: ConfirmationProps) {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" onClick={onCancel}>{cancelLabel}</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="outlined" onClick={onConfirm} color={confirmColor}>{confirmLabel}</Button>
        </Grid>
      </Grid>
    </div>
  );
}
