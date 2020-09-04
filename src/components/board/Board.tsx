import React from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import Router from 'next/router'
import { useServiceClient } from '../../services';
import { ProjectMeta } from '../../store/types';
import { useProjectsStyles } from './styles';
import AddBoard from './AddBoard';
import BoardList from './BoardList';

export default function Board() {
  const service = useServiceClient();
  const {
    error: errorLoading,
    loading,
    result
  } = useAsync<(ProjectMeta)[]>(service.getUserProjectsMeta.bind(service), []);

  const { error: errorDeleting, execute: handleDelete } = useAsyncCallback((id: string) => {
    service.deleteProject(id);
    Router.reload();
  });

  const classNames = useProjectsStyles();

  return (
    <div className={classNames.root}>
      <div className={classNames.menu}>
        <AddBoard />
        {result && result.map(({ id, title, description }: ProjectMeta) => {
          return (
            <BoardList key={id} id={id} title={title} description={description} onDelete={handleDelete} />
          );
        })}
      </div>
    </div>
  );
}
