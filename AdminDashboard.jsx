import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true)
          setError(null)
          try {
            const response = await axios.get('/api/admin/users')
            setUsers(response.data.users || [])
          } catch (err) {
            setError('Failed to load users')
          } finally {
            setLoading(false)
          }
        }
        fetchUsers()
  
}, [])
  

}