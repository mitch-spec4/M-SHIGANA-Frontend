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
    
}
