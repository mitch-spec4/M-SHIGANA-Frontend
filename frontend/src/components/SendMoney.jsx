import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

function SendMoney() {
  const { user } = useContext(AuthContext)
  const [receiverId, setReceiverId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [beneficiaries, setBeneficiaries] = useState([])

  // Fetch beneficiaries when the component mounts
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('/api/beneficiaries/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Pass the JWT token
          },
        })
        setBeneficiaries(response.data.beneficiaries)  // Assuming the response has "beneficiaries" key
      } catch (err) {
        setError('Failed to fetch beneficiaries')
      }
    }

    fetchBeneficiaries()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await axios.post('/api/transactions/send', {
        receiver_id: parseInt(receiverId, 10),
        amount: parseFloat(amount),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Pass the JWT token
        }
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
        <label htmlFor="receiverId">Select Beneficiary</label>
        <select
          id="receiverId"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
        >
          <option value="">Select a beneficiary</option>
          {beneficiaries.map((beneficiary) => (
            <option key={beneficiary.id} value={beneficiary.beneficiary_user_id}>
              {beneficiary.full_name || `User ID: ${beneficiary.beneficiary_user_id}`}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Money'}
        </button>
      </form>
    </div>
  )
}

export default SendMoney
