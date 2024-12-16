import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { endpoint } from '../utils/dataSet';

interface Entity {
  id: number;
  entity_name: string;
  entity_type: number;
  status: number;
}

interface EntitiesContextType {
  entities: Entity[] | null;
  reloadEntities: () => Promise<void>;
}

const EntitiesContext = createContext<EntitiesContextType | undefined>(undefined);

export function EntitiesProvider({ children }: { children: React.ReactNode }) {
  const [entities, setEntities] = useState<Entity[] | null>(null);

  // Fetch entities from API
  const fetchEntities = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/entities`);
      setEntities(response.data.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  // Reload entities manually
  const reloadEntities = async () => {
    await fetchEntities();
  };

  // Fetch entities on mount
  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <EntitiesContext.Provider value={{ entities, reloadEntities }}>
      {children}
    </EntitiesContext.Provider>
  );
}

export function useEntities() {
  const context = useContext(EntitiesContext);
  if (context === undefined) {
    throw new Error('useEntities must be used within an EntitiesProvider');
  }
  return context;
}