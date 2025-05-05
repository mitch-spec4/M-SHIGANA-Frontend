import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

function Notifications() {
  const { user } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/notifications/`)
      setNotifications(response.data.notifications || response.data)
    } catch (err) {
      setError('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div>
      <h2>Notifications</h2>
      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}
      {!loading && notifications.length === 0 && <p>No notifications.</p>}
      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            {new Date(n.timestamp).toLocaleString()} - {n.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications
