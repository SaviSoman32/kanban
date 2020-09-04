import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAsyncCallback } from 'react-async-hook';
import TextField from '@material-ui/core/TextField';

import { ConfirmationButtons } from '../buttons';
import { useServiceClient } from '../../services';

export interface Props {
  onCancel: () => void
}
export default function AddBoard() {
  const service = useServiceClient();
  const router = useRouter();
  const [title, setTitle] = useState('');


  const handleCancel = () => {
    setTitle('');
  }

  const { execute, loading, error, result: createdId } = useAsyncCallback(service.createProject.bind(service));

  if (createdId) {
    router.push(`/${createdId}`);
    return null;
  }

  const handleConfirm = () => {
    const Title = title.trim();
    if (!!Title) {
      execute(Title);
      setTitle('');
    }
  };

  return (
    <div>
      <TextField autoComplete="off" autoFocus id="outlined-search" label="Title" variant="outlined" size="medium" value={title} onChange={e => setTitle(e.target.value)}/>
      <ConfirmationButtons onCancel={handleCancel} onConfirm={handleConfirm} />

      {loading && <span>Creating ...</span>}
      {error && <span>Error</span>}
    </div>
  );
}
