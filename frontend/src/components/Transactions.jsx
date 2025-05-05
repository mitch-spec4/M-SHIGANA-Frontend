import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

function Transactions() {
  const { user } = useContext(AuthContext)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTransactions = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/transactions/history`)
      setTransactions(response.data.transactions || response.data)
    } catch (err) {
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [user])

  return (
    <div>
      <h2>Your Transactions</h2>
      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc' }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Sender</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Receiver</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Amount</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td style={{borderBottom: '1px solid #eee'}}>{tx.id}</td>
              <td style={{borderBottom: '1px solid #eee'}}>{tx.sender_email || tx.sender_id}</td>
              <td style={{borderBottom: '1px solid #eee'}}>{tx.receiver_email || tx.receiver_id}</td>
              <td style={{borderBottom: '1px solid #eee'}}>${tx.amount.toFixed(2)}</td>
              <td style={{borderBottom: '1px solid #eee'}}>{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
