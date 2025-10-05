import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api' // Change to your actual backend URL

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

// Auth
export const login = (data) => api.post('/auth/login', data)
export const signup = (data) => api.post('/auth/signup', data)
export const logout = () => api.post('/auth/logout')

// Tasks
export const fetchTasks = (params) => api.get('/tasks', { params })
export const createTask = (data) => api.post('/tasks', data)
export const fetchTask = (id) => api.get(`/tasks/${id}`)
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)
export const updateTaskStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status })
export const assignTask = (id, userId) => api.patch(`/tasks/${id}/assign`, { userId })

// Users
export const fetchUsers = () => api.get('/users')
export const addUser = (data) => api.post('/users', data)
export const removeUser = (id) => api.delete(`/users/${id}`)