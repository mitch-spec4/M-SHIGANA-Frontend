import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

axios.defaults.baseURL = 'http://localhost:5000/api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  // Enhanced email validation function
  const isValidEmail = (email) => {
    // Regex for stricter email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Client-side email validation before submission
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      await axios.post('/register', { name, email, password, role })

      // After successful registration, login the user automatically
      const loginResponse = await axios.post('/login', { email, password })
      if (loginResponse.data && loginResponse.data.token && loginResponse.data.user) {
        login(loginResponse.data.user, loginResponse.data.token)

        // Redirect based on role
        if (loginResponse.data.user.role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/wallet')
        }
      } else {
        navigate('/login')
      }
    } catch (err) {
      const message = err.response?.data?.message
      if (typeof message === 'string') {
        setError(message)
      } else if (typeof message === 'object') {
        // Convert object messages to string
        setError(JSON.stringify(message))
      } else {
        setError('Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="role">Role</label>
        <select id="role" value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
