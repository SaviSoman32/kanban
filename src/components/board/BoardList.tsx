import React, { useState } from 'react';
import { Typography, IconButton, Paper, Dialog } from '@material-ui/core';
import Link from 'next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useProjectStyles } from './styles';
import { ConfirmationButtons } from '../buttons';

export interface BoardProps {
  id: string,
  title: string,
  onDelete: (id: string) => void,
}

const noop = () => {};

export default function BoardList({ id, title, onDelete }: BoardProps) {
  const classNames = useProjectStyles();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);
  const handleDeleteConfirm = () => onDelete(id)

  return (
    <div key={id} className={classNames.root}>
      <div className={classNames.header}>
        <Typography variant="h6" component="h2">{title}</Typography>

        <div className={classNames.buttons}>
          <Link href={`/${id}`}>
            <IconButton onClick={noop}><VisibilityIcon/></IconButton>
          </Link>
          <IconButton onClick={openDeleteConfirm}><DeleteIcon/></IconButton>
        </div>
      </div>

      <Dialog open={isDeleteConfirmOpen}>
        <Paper className={classNames.dialog}>
          <Typography>Are you sure you want to delete this item?</Typography>
          <ConfirmationButtons onCancel={closeDeleteConfirm} onConfirm={handleDeleteConfirm} />
        </Paper>
      </Dialog>
    </div>
  );
}
