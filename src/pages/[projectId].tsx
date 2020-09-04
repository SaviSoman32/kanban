import React, { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { useRouter } from 'next/router';
import { useServiceClient } from '../services';
import { Dashboard } from '../components/dashboard';
import { Project as ProjectState, ProjectData } from '../store/types'; 

export default function DashboardPage() {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const service = useServiceClient();
  const { loading, result } = useAsync<ProjectState>(service.getProject.bind(service), [projectId]);

  const updateProjectData = useCallback((projectData: ProjectData) => {
    return service.updateProjectData(projectId, projectData);
  }, [service, projectId]);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Dashboard state={result.data} updateProjectData={updateProjectData} title={result.meta.title} projectsUrlPath="/" />
  );
}
