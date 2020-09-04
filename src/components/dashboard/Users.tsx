import React, { ChangeEvent, forwardRef } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { hooks } from '../../store';
import { useTaskAssignmentStyles } from './styles';

export interface Props {
  id: string
}

export default function Users({ id }: Props) {
  const userIds = hooks.useUserIds();
  const { assigneeId } = hooks.useTask(id);
  const assignTask = hooks.useAssignTask();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value as string;
    assignTask(id, userId)
  };

  const classNames = useTaskAssignmentStyles();

  return (
    <div className={classNames.container}>
      <Select
        value={assigneeId || ''}
        onChange={handleChange}
        variant="outlined"
        className={classNames.select}
      >
        {userIds.map(userId => (
          <MenuItem key={userId} value={userId} selected={userId === assigneeId}>
            <AssignableUsername id={userId}/>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}


export interface AssignableUsernameProps {
  id: string
}
function AssignableUsername({ id }: AssignableUsernameProps) {
  const user = hooks.useUser(id);
  if (!user) {
    return null;
  }

  return (
    <span>{user.username}</span>
  );
}

