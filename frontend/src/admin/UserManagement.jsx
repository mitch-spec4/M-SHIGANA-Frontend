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
}
