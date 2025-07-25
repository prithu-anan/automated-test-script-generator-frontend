import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './api-config';

export interface TaskCreate {
  task_name: string;
  instruction?: string;
  description?: string;
  search_input_input?: string;
  search_input_action?: string;
  expected_outcome?: string;
  expected_status?: string;
}

export interface TaskResponse {
  id: number;
  task_name: string;
  status: string;
  llm_provider: string;
  llm_model: string;
  temperature: number;
  base_url?: string;
  api_key?: string;
  browser_headless_mode: boolean;
  disable_security: boolean;
  window_width: number;
  window_height: number;
  instruction?: string;
  description?: string;
  search_input_input?: string;
  search_input_action?: string;
  expected_outcome?: string;
  expected_status?: string;
  user_id: number;
}

export const createTask = async (taskData: TaskCreate, settings: any) => {
  try {
    const taskWithSettings = {
      ...taskData,
      ...settings,
    };

    const res = await axios.post(`${API_BASE_URL}/tasks`, taskWithSettings, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200 || res.status === 201) {
      return res.data;
    }

  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || err.response.data?.message || "Failed to create task";
      return { error: errorMessage };
    } else if (err.request) {
      return { error: "No response from server. Check your connection." };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const getTasks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }

  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || err.response.data?.message || "Failed to fetch tasks";
      return { error: errorMessage };
    } else if (err.request) {
      return { error: "No response from server. Check your connection." };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const getTask = async (taskId: number) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }

  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || err.response.data?.message || "Failed to fetch task";
      return { error: errorMessage };
    } else if (err.request) {
      return { error: "No response from server. Check your connection." };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const initiateTask = async (taskId: number) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/tasks/${taskId}/initiate`, {}, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }

  } catch (err) {
    if (err.response) {
      const errorMessage = err.response.data?.detail || err.response.data?.message || "Failed to initiate task";
      return { error: errorMessage };
    } else if (err.request) {
      return { error: "No response from server. Check your connection." };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};
