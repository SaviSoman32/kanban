import React from 'react';
import { DragDropContext, DropResult, Droppable, DroppableProvided, Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { hooks, emptyArray } from '../../store';
import { useBoardStyles } from './styles';
import Panel from './Panel';

export default function Brand() {
  const statusIds = hooks.useStatusIds();
  const moveStatus = hooks.useMoveStatus();
  const moveTask = hooks.useMoveStatusTask();
  const classNames = useBoardStyles();

  const handleDragEnd = ({ type, source, destination, draggableId }: DropResult) => {
    console.log('test', draggableId);
    if (source && destination) {
      if (type === 'statusLane' && moveStatus) {
        moveStatus(source.index, destination.index);
      }

      if (type === 'taskCard' && moveTask) {
        moveTask(
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
      }
    }
  };

  return (
    <div className={classNames.board}>
      <DragDropContext onDragEnd={handleDragEnd}>

        <Droppable type="statusLane" droppableId="projectBoard" direction="horizontal">
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.lanes}>
                {(statusIds || emptyArray).map((statusId, index) => (
                  <Draggable key={statusId} draggableId={statusId.toString()} index={index}>
                    {(provided: DraggableProvided) => {
                      return (
                        <div className={classNames.laneContainer} ref={provided.innerRef} {...provided.draggableProps}>
                          <Panel id={statusId} dragHandleProps={provided.dragHandleProps} />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
