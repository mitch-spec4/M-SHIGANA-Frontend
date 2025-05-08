import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import api from '../api'
import { AuthContext } from '../App'

function Beneficiaries() {
  const { user, token } = useContext(AuthContext)
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [fullName, setFullName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [beneficiaryUserId, setBeneficiaryUserId] = useState('')

  // const API_BASE_URL = 'http://127.0.0.1:5000/api/' // Use 127.0.0.1 to match backend host

  const fetchBeneficiaries = async () => {
    if (!user || !token) return
    console.log('Using token for fetch:', token)
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await api.get('beneficiaries/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBeneficiaries(response.data.beneficiaries || response.data)
    } catch (err) {
      console.error('Fetch beneficiaries error:', err)
      setError('Failed to load beneficiaries: ' + (err.response?.data?.msg || err.message))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBeneficiaries()
  }, [user, token])

  const addBeneficiary = async (e) => {
    e.preventDefault()
    if (!user || !token) return

    setError(null)
    setSuccess(null)

    try {
      await api.post('beneficiaries/', {
        beneficiary_user_id: beneficiaryUserId,
        full_name: fullName,
        account_number: accountNumber,
        bank_name: bankName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      await fetchBeneficiaries()

      // Clear form
      setFullName('')
      setAccountNumber('')
      setBankName('')
      setBeneficiaryUserId('')
      setSuccess('Beneficiary added successfully')
    } catch (err) {
      console.error('Add beneficiary error:', err)
      setError('Failed to add beneficiary: ' + (err.response?.data?.msg || err.message))
    }
  }

  return (
    <div>
      <h2>Beneficiaries</h2>
      {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
      {success && <div className="success" style={{ color: 'green' }}>{success}</div>}

      <form onSubmit={addBeneficiary}>
        <label htmlFor="beneficiaryUserId">Beneficiary Unique number</label>
        <input
          id="beneficiaryUserId"
          type="text"
          required
          value={beneficiaryUserId}
          onChange={e => setBeneficiaryUserId(e.target.value)}
        />

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <label htmlFor="accountNumber">Account Number</label>
        <input
          id="accountNumber"
          type="text"
          required
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
        />

        <label htmlFor="bankName">Bank Name</label>
        <input
          id="bankName"
          type="text"
          required
          value={bankName}
          onChange={e => setBankName(e.target.value)}
        />

        <button type="submit">Add Beneficiary</button>
      </form>

      <h3>Your Beneficiaries</h3>
      {loading && <p>Loading...</p>}
      <ul>
        {beneficiaries.map(b => (
          <li key={b.id}>
            {b.full_name || b.name} - {b.bank_name || 'N/A'} - {b.account_number || b.account}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Beneficiaries
