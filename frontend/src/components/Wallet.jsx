import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

axios.defaults.baseURL = 'http://localhost:5000/api'

function Wallet() {
  const { user } = useContext(AuthContext)
  const [balance, setBalance] = useState(null)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBalance = async () => {
    if (!user) return
    try {
      const response = await axios.get(`/wallet/${user.id}`)
      setBalance(response.data.balance)
    } catch (err) {
      setError('Failed to fetch wallet balance')
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [user])

  const addFunds = async (e) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const response = await axios.post(`/wallet/add-funds`, { amount })
      setMessage('Funds added successfully.')
      setAmount('')
      fetchBalance()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add funds')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Wallet</h2>
      {error && <div className="error">{error}</div>}
      <p>Balance: {balance !== null ? `$${balance.toFixed(2)}` : 'Loading...'}</p>
      <form onSubmit={addFunds}>
        <label htmlFor="amount">Add Funds</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Funds'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Wallet
