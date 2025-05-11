import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../App'

function UserDashboard() {
  const { user } = useContext(AuthContext)
  const [balance, setBalance] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [errorBalance, setErrorBalance] = useState(null)
  const [errorTransactions, setErrorTransactions] = useState(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return
      setLoadingBalance(true)
      setErrorBalance(null)
      try {
        const response = await axios.get(`/api/wallet/${user.id}`)
        setBalance(response.data.balance)
      } catch (err) {
        setErrorBalance('Failed to fetch wallet balance')
      } finally {
        setLoadingBalance(false)
      }
    }

    const fetchTransactions = async () => {
      if (!user) return
      setLoadingTransactions(true)
      setErrorTransactions(null)
      try {
        const response = await axios.get(`/api/transaction/user/${user.id}`)
        setTransactions(response.data.transactions || response.data)
      } catch (err) {
        setErrorTransactions('Failed to load transactions')
      } finally {
        setLoadingTransactions(false)
      }
    }

    fetchBalance()
    fetchTransactions()
  }, [user])

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <section>
        <h2>Wallet Balance</h2>
        {loadingBalance && <p>Loading balance...</p>}
        {errorBalance && <p className="error">{errorBalance}</p>}
        {balance !== null && <p>${balance.toFixed(2)}</p>}
      </section>
      <section>
        <h2>Recent Transactions</h2>
        {loadingTransactions && <p>Loading transactions...</p>}
        {errorTransactions && <p className="error">{errorTransactions}</p>}
        {!loadingTransactions && transactions.length === 0 && <p>No transactions found.</p>}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.sender_email || tx.sender_id}</td>
                <td>{tx.receiver_email || tx.receiver_id}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default UserDashboard
