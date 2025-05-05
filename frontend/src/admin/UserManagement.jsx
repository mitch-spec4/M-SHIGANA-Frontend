import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserManagement() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editingUserId, setEditingUserId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        email: '',
        role: '',
        status: ''
    })
    const [actionLoading, setActionLoading] = useState(false)
    const [actionError, setActionError] = useState(null)
    const [addFormData, setAddFormData] = useState({
      email: '',
      role: 'user',
      status: 'active'
    })
    const [addLoading, setAddLoading] = useState(false)
    const [addError, setAddError] = useState(null)
    const [addSuccess, setAddSuccess] = useState(null)
  
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get('/admin/users')
        setUsers(response.data.users || [])
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
        fetchUsers()
      }, [])
    
      const startEditing = (user) => {
        setEditingUserId(user.id)
        setEditFormData({
          email: user.email,
          role: user.role,
          status: user.status || 'active'
        })
        setActionError(null)
      }
    
      const cancelEditing = () => {
        setEditingUserId(null)
        setEditFormData({
          email: '',
          role: '',
          status: ''
        })
        setActionError(null)
      }
      const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditFormData(prev => ({ ...prev, [name]: value }))
      }
    
      const handleAddInputChange = (e) => {
        const { name, value } = e.target
        setAddFormData(prev => ({ ...prev, [name]: value }))
        setAddError(null)
        setAddSuccess(null)
      }
    
      const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
      }
      const saveUser = async () => {
        if (!validateEmail(editFormData.email)) {
          setActionError('Invalid email address')
          return
        }
        if (!editFormData.role) {
          setActionError('Role is required')
          return
        }
        if (!editFormData.status) {
          setActionError('Status is required')
          return
        }
        setActionLoading(true)
        setActionError(null)
        try {
          await axios.put(`/admin/users/${editingUserId}`, {
            email: editFormData.email,
            role: editFormData.role,
            status: editFormData.status
          })
          await fetchUsers()
          cancelEditing()
        } catch (err) {
          setActionError('Failed to save user details')
        } finally {
          setActionLoading(false)
        }
      }
      const addUser = async () => {
        if (!validateEmail(addFormData.email)) {
          setAddError('Invalid email address')
          return
        }
        if (!addFormData.role) {
          setAddError('Role is required')
          return
        }
        if (!addFormData.status) {
          setAddError('Status is required')
          return
        }
        setAddLoading(true)
        setAddError(null)
        setAddSuccess(null)
        try {
          await axios.post('/admin/users', {
            email: addFormData.email,
            role: addFormData.role,
            status: addFormData.status
          })
          setAddSuccess('User added successfully')
          setAddFormData({
            email: '',
            role: 'user',
            status: 'active'
          })
          await fetchUsers()
        } catch (err) {
          setAddError('Failed to add user')
        } finally {
          setAddLoading(false)
        }
      }
      const toggleUserStatus = async (user) => {
        setActionLoading(true)
        setActionError(null)
        try {
          const newStatus = user.status === 'active' ? 'inactive' : 'active'
          await axios.patch(`/admin/users/${user.id}/status`, { status: newStatus })
          await fetchUsers()
        } catch (err) {
          setActionError('Failed to update user status')
        } finally {
          setActionLoading(false)
        }
      }
      const deleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
          return
        }
        setActionLoading(true)
        setActionError(null)
        try {
          await axios.delete(`/admin/users/${userId}`)
          await fetchUsers()
        } catch (err) {
          setActionError('Failed to delete user')
        } finally {
          setActionLoading(false)
        }
      }
    
      return (
        <div>
          <h1>User Management</h1>
    
          <section style={{ marginBottom: '2rem' }}>
            <h2>Add New User</h2>
            {addError && <p className="error">{addError}</p>}
            {addSuccess && <p className="success">{addSuccess}</p>}
            <form onSubmit={e => { e.preventDefault(); addUser() }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={addFormData.email}
                onChange={handleAddInputChange}
                disabled={addLoading}
                required
              />
              <select
                name="role"
                value={addFormData.role}
                onChange={handleAddInputChange}
                disabled={addLoading}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
              <select
                name="status"
                value={addFormData.status}
                onChange={handleAddInputChange}
                disabled={addLoading}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type="submit" disabled={addLoading}>Add User</button>
            </form>
          </section>
    
          {loading && <p>Loading users...</p>}
          {error && <p className="error">{error}</p>}
          {actionError && <p className="error">{actionError}</p>}
          {!loading && users.length === 0 && <p>No users found.</p>}
          {!loading && users.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editingUserId === user.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleInputChange}
                          disabled={actionLoading}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <select
                          name="role"
                          value={editFormData.role}
                          onChange={handleInputChange}
                          disabled={actionLoading}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="moderator">Moderator</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={handleInputChange}
                          disabled={actionLoading}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      ) : (
                        user.status || 'active'
                      )}
                    </td>
                    <td>
                      {editingUserId === user.id ? (
                        <>
                          <button onClick={saveUser} disabled={actionLoading}>Save</button>
                          <button onClick={cancelEditing} disabled={actionLoading}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(user)} disabled={actionLoading}>Edit</button>
                          <button onClick={() => toggleUserStatus(user)} disabled={actionLoading}>
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button onClick={() => deleteUser(user.id)} disabled={actionLoading}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )
    
}

export default UserManagement