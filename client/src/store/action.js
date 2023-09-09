import axios from 'axios'
import axiosInstance from './axiosInstance'
export const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })
      if (response.data) {
        commit('setUser', response.data.user)
        localStorage.setItem('token', response.data.token)
        return { success: true }
      }

      return { success: false, message: 'Invalid credentials' }
    } catch (error) {
      console.error('An error occurred during login:', error)
      return { success: false, message: 'An error occurred during login' }
    }
  },
  async logout({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    commit('clearUser')
  },

  async register({ commit }, { name, email, password }) {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })
      if (response.data) {
        commit('setUser', response.data.user)
        return { success: true }
      }
      return { success: false, message: 'Registration failed' }
    } catch (error) {
      console.error('An error occurred during registration:', error)
      return { success: false, message: 'An error occurred during registration' }
    }
  },
  async createTask({ commit }, taskData) {
    try {
      const response = await axiosInstance.post('/api/tasks', taskData);
      if (response.status === 201 && response.data.status === 'success') {
        commit('setTask', response.data.task);
        return { success: true, task: response.data.task };
      }
      return { success: false, message: 'Task creation failed' };
    } catch (error) {
      console.error('An error occurred during task creation:', error);
      return { success: false, message: 'An error occurred during task creation' };
    }
  },
  
  

  async updateTask({ commit }, { taskId, description }) {
    try {
      const response = await axiosInstance.put(`/api/tasks/${taskId}`, { description });
      if (response.data) {
        commit('updateTask', response.data.task);
        return { success: true, task: response.data.task };
      }
      return { success: false, message: 'Task update failed' };
    } catch (error) {
      console.error('An error occurred during task update:', error);
      return { success: false, message: 'An error occurred during task update' };
    }
  },

  async deleteTask({ commit }, taskId) {
    try {
      const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
      if (response.data && response.data.success) {
        commit('deleteTask', taskId);
        return { success: true };
      }
      return { success: false, message: 'Task deletion failed' };
    } catch (error) {
      console.error('An error occurred during task deletion:', error);
      return { success: false, message: 'An error occurred during task deletion' };
    }
  },

  async fetchTasks({ commit }) {
    try {
      const response = await axiosInstance.get('/api/tasks');
      if (response.data) {
        commit('setTasks', response.data.tasks);
        return { success: true, tasks: response.data.tasks };
      }
      return { success: false, message: 'Task fetch failed' };
    } catch (error) {
      console.error('An error occurred during task fetch:', error);
      return { success: false, message: 'An error occurred during task fetch' };
    }
  },
  async fetchSharedTasks({ commit }) {
    try {
      const response = await axiosInstance.get('/api/shared-tasks');
      if (response.data) {
        commit('setSharedTasks', response.data.sharedTasks);
        return { success: true, sharedTasks: response.data.sharedTasks };
      }
      return { success: false, message: 'Shared task fetch failed' };
    } catch (error) {
      console.error('An error occurred during shared task fetch:', error);
      return { success: false, message: 'An error occurred during shared task fetch' };
    }
  },

  async shareTask({ commit }, { taskId, sharedWithUserId }) {
    try {
      const response = await axiosInstance.patch(`/api/tasks/${taskId}/share`, { sharedWithUserId });
      if (response.data) {
        commit('updateTask', response.data.task);
        return { success: true, task: response.data.task };
      }
      return { success: false, message: 'Task sharing failed' };
    } catch (error) {
      console.error('An error occurred during task sharing:', error);
      return { success: false, message: 'An error occurred during task sharing' };
    }
  },
}
