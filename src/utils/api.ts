import axios from 'axios';
import { ProjectsResponse } from '../types/project';

const API_BASE_URL = "https://pradyogik.in/api";

export const api = {
  async getProjects() {
    try {
      const response = await axios.get<ProjectsResponse>(`${API_BASE_URL}/projects/`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }
};