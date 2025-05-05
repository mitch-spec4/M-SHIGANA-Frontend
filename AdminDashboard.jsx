import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
}