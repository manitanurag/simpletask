import React, { useEffect, useState } from 'react'
import { fetchTasks } from '../api'
import TaskList from '../components/TaskList'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetchTasks({ page })
      .then(res => {
        setTasks(res.data.tasks)
        setTotalPages(res.data.totalPages || 1)
      })
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div>
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <div>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Link to="/task/new">Create Task</Link> | <Link to="/users">Manage Users</Link>
      </div>
      <TaskList tasks={tasks} loading={loading} />
      <div className="pagination">
        <button onClick={() => setPage(page-1)} disabled={page <= 1}>Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(page+1)} disabled={page >= totalPages}>Next</button>
      </div>
    </div>
  )
}