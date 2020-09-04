import React from 'react';
import { Dialog, Typography} from '@material-ui/core';
import { CloseButton } from '../buttons';
import { hooks } from '../../store';
import { useCurrentUserId } from './CurrentUser';
import Users from './Users';
import { useTaskDetailsStyles } from './styles';




export interface Props {
  id: string,
  isOpen?: boolean,
  close: () => void
}
export default function CardDetails({ id, isOpen, close }: Props) {
  const { title, creatorId } = hooks.useTask(id);
  const classNames = useTaskDetailsStyles();
  const updateTask = hooks.useUpdateTask();
  const currentUserId = useCurrentUserId();
  const creator = hooks.useUser(creatorId);

  return (
    <Dialog open={isOpen} onBackdropClick={close} fullWidth>
      <div className={classNames.root}>
          <div className={classNames.header}>
            <div className={classNames.title}>
              <Typography>
                {title} 
              </Typography>
            </div>
            <span className={classNames.closeBtn}>
              <CloseButton onClick={close}/>
            </span>
          </div>
          
          <div className={classNames.section}>
            <Typography variant="subtitle2">Assigned to:</Typography>
            <br/>
            <Users id={id} />
          </div>
        </div>
    </Dialog> 
  );
}
