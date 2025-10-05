import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchTask, deleteTask, updateTaskStatus } from '../api'

export default function TaskDetails() {
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchTask(id).then(res => setTask(res.data)).finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    await deleteTask(id)
    navigate('/')
  }

  const handleStatusChange = async (status) => {
    await updateTaskStatus(id, status)
    setTask({ ...task, status })
  }

  if (loading) return <div>Loading...</div>
  if (!task) return <div>Task not found.</div>

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div>Due: {task.dueDate}</div>
      <div>Status: {task.status}</div>
      <div>Priority: {task.priority}</div>
      <div>
        <Link to={`/task/${id}/edit`}>Edit</Link>
        {' | '}
        <button onClick={() => setShowConfirm(true)}>Delete</button>
        {' | '}
        <button onClick={() => handleStatusChange(task.status === 'completed' ? 'pending' : 'completed')}> 
          Mark as {task.status === 'completed' ? 'Pending' : 'Completed'}
        </button>
      </div>
      {showConfirm &&
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      }
    </div>
  )
}