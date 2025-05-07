import React, { useState, useEffect, useContext } from 'react'
import api from '../api'
import { AuthContext } from '../App'

function Notifications() {
  const { user, token } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('notifications/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data.notifications || response.data
      const sorted = [...data].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )
      setNotifications(sorted)
    } catch (err) {
      console.error(err)
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.token) {
      fetchNotifications()
    }
  }, [user])

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={fetchNotifications} disabled={loading}>
        Refresh
      </button>
      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}
      {!loading && notifications.length === 0 && <p>No notifications.</p>}
      <ul>
        {notifications.map(n => (
          <li key={n.id} style={{ fontWeight: n.read ? 'normal' : 'bold' }}>
            {new Date(n.timestamp).toLocaleString()} - {n.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
