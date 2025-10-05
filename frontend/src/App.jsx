import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TaskDetails from './pages/TaskDetails'
import TaskForm from './pages/TaskForm'
import UserManagement from './pages/UserManagement'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/task/new" element={
          <PrivateRoute>
            <TaskForm />
          </PrivateRoute>
        } />
        <Route path="/task/:id" element={
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        } />
        <Route path="/task/:id/edit" element={
          <PrivateRoute>
            <TaskForm editMode />
          </PrivateRoute>
        } />
        <Route path="/users" element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}