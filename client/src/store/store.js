// store.js

import { createStore } from 'vuex';
import { actions } from './action'; 

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const store = createStore({
  state: {
    user: loadUserFromLocalStorage(), 
    tasks: [], 
    sharedTasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setSharedTasks(state, sharedTasks) {
      state.sharedTasks = sharedTasks;
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
      const sharedIndex = state.sharedTasks.findIndex((task) => task._id === updatedTask._id);
      if (sharedIndex !== -1) {
        state.sharedTasks[sharedIndex] = updatedTask;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },
  },
  actions, 
  getters: {
    isLoggedIn: (state) => {
      return !!state.user; 
    },
  },
});

export default store;
