import React, { useEffect, useState } from 'react'
import { fetchUsers, addUser, removeUser } from '../api'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const loadUsers = () => {
    fetchUsers().then(res => setUsers(res.data))
  }

  useEffect(() => { loadUsers() }, [])

  const handleAdd = async e => {
    e.preventDefault()
    setLoading(true)
    await addUser({ username })
    setUsername('')
    loadUsers()
    setLoading(false)
  }

  const handleRemove = async (id) => {
    setLoading(true)
    await removeUser(id)
    loadUsers()
    setLoading(false)
  }

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleAdd}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="New username" required />
        <button type="submit" disabled={loading}>Add User</button>
      </form>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {u.username}
            <button onClick={() => handleRemove(u.id)} disabled={loading}>Remove</button>
          </li>
        )}
      </ul>
    </div>
  )
}