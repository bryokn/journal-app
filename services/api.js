import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:5000';  // Replace with your actual backend IP and port

// Token management functions
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (e) {
    console.error('Failed to store the token', e);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (e) {
    console.error('Failed to get the token', e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.error('Failed to remove the token', e);
  }
};

// API functions
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  await storeToken(data.access_token);
  return data;
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const logout = async () => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  await removeToken();
  return response.json();
};

export const getCategories = async () => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const createEntry = async (entryData) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(entryData),
  });
  if (!response.ok) throw new Error('Failed to create entry');
  return response.json();
};

export const getEntries = async () => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch entries');
  return response.json();
};

// manage (get, update, delete) a journal entry by ID route
export const getEntry = async (entryId) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries/${entryId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch entry');
  return response.json();
};

export const updateEntry = async (entryId, entryData) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(entryData),
  });
  if (!response.ok) throw new Error('Failed to update entry');
  return response.json();
};

export const deleteEntry = async (entryId) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/entries/${entryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete entry');
  return response.json();
};

export const getSummary = async (period) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/summary?period=${period}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch summary');
  return response.json();
};

export const getUserInfo = async () => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user info');
  return response.json();
};

export const updateUserInfo = async (userData) => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user info');
  return response.json();
};