import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { api } from '../utils/api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, isLoading, error };
}