import React, { useState } from 'react';
import { Paper, Typography, IconButton, Dialog }  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Draggable, DraggableProvided, Droppable, DroppableProvided, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { hooks, emptyArray } from '../../store';
import { ConfirmationButtons } from '../buttons';
import Card from './Card';
import TaskEditorForm from './TaskEditorForm';
import { useLaneStyles } from './styles';
import { useCurrentUserId } from './CurrentUser';


export interface Props {
  id: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function Panel({ id, dragHandleProps }: Props) {
  console.log('id' , id);
  const currentUserId = useCurrentUserId();
  const createTask = hooks.useCreateTask();
  const deleteStatus = hooks.useDeleteStatus();
  const { title, taskIds } = hooks.useStatus(id);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const openTaskForm = () => setIsTaskFormOpen(true);
  const closeTaskForm = () => setIsTaskFormOpen(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);

  const handleSubmitNewTask = (title: string) => {
    if (createTask && currentUserId) {
      createTask({ title, statusId: id, creatorId: currentUserId });
    }
    closeTaskForm();
  };

  const handleConfirmDelete = () => {
    if (deleteStatus) {
      deleteStatus(id);
    }
  };

  const classNames = useLaneStyles();

  return (
    <Paper
      className={`${classNames.lane} board-status`}
      elevation={0}
    >
      <div className={classNames.laneHeader}>

        <Typography align="center" className={classNames.laneTitle}>{title}</Typography>

        <div className={classNames.buttons}>
          <IconButton onClick={openTaskForm}>
            <AddIcon />
          </IconButton>
        </div>

        <Dialog open={isDeleteConfirmOpen}>
          <Paper className={classNames.dialog}>
            <Typography>Delete column "{title}"?</Typography>
            <ConfirmationButtons
              onCancel={closeDeleteConfirm}
              onConfirm={handleConfirmDelete}
              confirmColor="secondary"
              confirmLabel="Delete"
            />
          </Paper>
        </Dialog>
      </div>

      <div className={classNames.form}>
        {isTaskFormOpen && (
          <TaskEditorForm onSubmit={handleSubmitNewTask} onCancel={closeTaskForm}/>
        )}
      </div>

      <Droppable type="taskCard" droppableId={id.toString()}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.tasks}>
              {(taskIds || emptyArray).map((taskId, index) => (
                <Draggable key={taskId} draggableId={taskId.toString()} index={index}>
                  {(provided: DraggableProvided) => {
                    return (
                      <div className={classNames.taskContainer} ref={provided.innerRef} {...provided.draggableProps}>
                        <Card statusId={id} id={taskId} dragHandleProps={provided.dragHandleProps} />
                      </div>
                    )
                  }}
                </Draggable>
              ))}
            </div>
          )
        }}
      </Droppable>
    </Paper>
  );
}
