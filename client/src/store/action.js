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
  
  
  async updateTask({ commit }, taskData) {
    try {
      const response = await axiosInstance.put(`/api/tasks/${taskData._id}`, taskData); 

      if (response.status === 200 && response.data.status === 'success') {
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

    if (response.status === 200 && response.data.status === 'success') {
      commit('deleteTask', taskId);
      return { status: true }; // Change 'success' to 'status'
    }

    return { status: false, message: 'Task deletion failed' };
  } catch (error) {
    console.error('An error occurred during task deletion:', error);
    return { status: false, message: 'An error occurred during task deletion' };
  }
}
,

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
  
  async fetchSharedTasks({ commit }, id) {
    try {
      const response = await axiosInstance.get(`/api/tasks/shared/${id}`);
      console.log(response)
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
  


async getTaskById({ commit }, taskId) {
  try {
    const response = await axiosInstance.get(`/api/tasks/${taskId}`);
    if (response.data) {
      const task = response.data.task;
      commit('setTasks', task); 
      return { success: true, task };
    }
    return { success: false, message: 'Task retrieval failed' };
  } catch (error) {
    console.error('An error occurred during task retrieval:', error);
    return { success: false, message: 'An error occurred during task retrieval' };
  }
},
async fetchAllUsers({ commit }) {
  try {
    const response = await axiosInstance.get('/api/profile/users');
    if (response.data) {
      commit('setAllUsers', response.data.users);
      return { success: true, users: response.data.users };
    }
    return { success: false, message: 'Failed to fetch users' };
  } catch (error) {
    console.error('An error occurred while fetching users:', error);
    return { success: false, message: 'An error occurred while fetching users' };
  }
},
async getUserById({ commit }, userId) {
  try {
    const response = await axiosInstance.get(`/api/profile/users/${userId}`);
    if (response.data) {
      return { success: true, user: response.data.user };
    }
    return { success: false, message: 'User not found' };
  } catch (error) {
    console.error('An error occurred while fetching the user:', error);
    return { success: false, message: 'An error occurred while fetching the user' };
  }
},
async deleteUser({ commit }, userId) {
  try {
    const response = await axiosInstance.delete(`/api/profile/users/${userId}`);
    if (response.data && response.data.status === 'success') {
      commit('deleteUser', userId); 
      return { success: true };
    }
    return { success: false, message: 'User deletion failed' };
  } catch (error) {
    console.error('An error occurred while deleting the user:', error);
    return { success: false, message: 'An error occurred while deleting the user' };
  }
},
async updateUser({ commit }, { id, userData }) {
  try {
    const response = await axiosInstance.put(`/api/profile/users/${id}`, userData);
    if (response.data) {
      commit('updateUser', response.data.user); 
      return { success: true, user: response.data.user };
    }
    return { success: false, message: 'User update failed' };
  } catch (error) {
    console.error('An error occurred while updating the user:', error);
    return { success: false, message: 'An error occurred while updating the user' };
  }
}



};
