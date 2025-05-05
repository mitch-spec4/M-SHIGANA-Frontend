import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

function SendMoney() {
  const { user } = useContext(AuthContext)
  const [receiverId, setReceiverId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const response = await axios.post('/transactions/send', {
        receiver_id: parseInt(receiverId, 10),
        amount: parseFloat(amount),
      })
      setMessage('Transaction successful.')
      setReceiverId('')
      setAmount('')
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Send Money</h2>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
      <form onSubmit={onSubmit}>
        <label htmlFor="receiverId">Receiver User ID</label>
        <input
          id="receiverId"
          type="number"
          required
          value={receiverId}
          onChange={e => setReceiverId(e.target.value)}
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          required
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Money'}
        </button>
      </form>
    </div>
  )
}

export default SendMoney
