import React, { useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { AddPopper } from '../popper';
import { hooks } from '../../store';
import CardDetails from './CardDetails';
import { useCardStyles } from './styles';


export interface Props {
  id: string,
  statusId: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function Card({ id, dragHandleProps }: Props) {
  const classNames = useCardStyles();
  const { title, assigneeId } = hooks.useTask(id);
  const assignee = hooks.useUser(assigneeId);
  const deleteTask = hooks.useDeleteTask();
  const handleClickDelete = () => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  return (
    <Paper className={classNames.task} {...dragHandleProps}>
      <div className={classNames.taskHeader}>
        <div>
          <Typography className={classNames.title}>{title}</Typography>

          {assignee &&
          <Typography variant="subtitle2">Assigned to {assignee.username}</Typography>
          }
        </div>

        <AddPopper>
          <List>
            <ListItem button onClick={openDetails}>
              <ListItemText primary="Edit"/>
            </ListItem>
            <ListItem button onClick={handleClickDelete}>
              <ListItemText primary="Delete"/>
            </ListItem>
          </List>
        </AddPopper>
      </div>

      {isDetailsOpen &&
      <CardDetails
        id={id}
        isOpen={isDetailsOpen}
        close={closeDetails}
      />
      }
    </Paper>
  );
}

