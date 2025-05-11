import { authAPI } from '@/services/api';

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
  isAdmin: (state) => state.user && state.user.role === 'admin',
  isDoctor: (state) => state.user && state.user.role === 'doctor',
  isPatient: (state) => state.user && state.user.role === 'patient',
  authLoading: (state) => state.loading,
  authError: (state) => state.error
};

const actions = {
  // Register user
  async register({ commit, dispatch }, userData) {
    try {
      commit('setLoading', true);
      commit('clearError');

      const response = await authAPI.register(userData);

      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Get user data
      await dispatch('loadUser');

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Registration failed');
      commit('setLoading', false);
      throw error;
    }
  },

  // Login user
  async login({ commit, dispatch }, credentials) {
    try {
      commit('setLoading', true);
      commit('clearError');

      const response = await authAPI.login(credentials);

      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Get user data
      await dispatch('loadUser');

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Login failed');
      commit('setLoading', false);
      throw error;
    }
  },

  // Logout user
  async logout({ commit }) {
    try {
      await authAPI.logout();

      // Remove token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      commit('clearUser');
      return true;
    } catch (error) {
      // Even if the API call fails, we still want to clear the local state
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      commit('clearUser');
      return true;
    }
  },

  // Load user data
  async loadUser({ commit }) {
    try {
      commit('setLoading', true);

      const response = await authAPI.getMe();

      const userData = response.data.data;

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      commit('setUser', userData);
      commit('setLoading', false);
      return userData;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to load user data');
      commit('setLoading', false);

      // If we can't load the user, clear the auth state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      commit('clearUser');

      throw error;
    }
  },

  // Update user details
  async updateUserDetails({ commit, dispatch }, userData) {
    try {
      commit('setLoading', true);

      const response = await authAPI.updateDetails(userData);

      // Reload user data to get updated info
      await dispatch('loadUser');

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to update user details');
      commit('setLoading', false);
      throw error;
    }
  },

  // Update password
  async updatePassword({ commit }, passwordData) {
    try {
      commit('setLoading', true);

      const response = await authAPI.updatePassword(passwordData);

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to update password');
      commit('setLoading', false);
      throw error;
    }
  },

  // Forgot password
  async forgotPassword({ commit }, email) {
    try {
      commit('setLoading', true);

      const response = await authAPI.forgotPassword(email);

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to process forgot password request');
      commit('setLoading', false);
      throw error;
    }
  },

  // Reset password
  async resetPassword({ commit }, { token, password }) {
    try {
      commit('setLoading', true);

      const response = await authAPI.resetPassword(token, password);

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to reset password');
      commit('setLoading', false);
      throw error;
    }
  },

  // Verify email
  async verifyEmail({ commit }, token) {
    try {
      commit('setLoading', true);

      const response = await authAPI.verifyEmail(token);

      commit('setLoading', false);
      return response.data;
    } catch (error) {
      commit('setError', error.response ? error.response.data.error : 'Failed to verify email');
      commit('setLoading', false);
      throw error;
    }
  }
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.token = null;
    state.user = null;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, error) {
    state.error = error;
  },
  clearError(state) {
    state.error = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
