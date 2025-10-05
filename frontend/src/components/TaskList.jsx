import React from 'react'
import { Link } from 'react-router-dom'
import './TaskList.css'

const PRIORITY_COLORS = {
  high: '#ffadad',
  medium: '#fdffb6',
  low: '#caffbf'
}

export default function TaskList({ tasks, loading }) {
  if (loading) return <div>Loading tasks...</div>
  if (!tasks.length) return <div>No tasks found.</div>

  return (
    <div className="task-list">
      {['high', 'medium', 'low'].map(priority => (
        <div key={priority} className="priority-column" style={{ background: PRIORITY_COLORS[priority] }}>
          <h3>{priority.toUpperCase()} Priority</h3>
          {tasks.filter(t => t.priority === priority).map(task => (
            <Link className="task-item" key={task.id} to={`/task/${task.id}`}> 
              <div className="task-title">{task.title}</div>
              <div className="task-due">Due: {task.dueDate}</div>
              <div className="task-status">{task.status}</div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}