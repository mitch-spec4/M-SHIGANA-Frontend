<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";

function BeneficiaryOversight() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = () => {
    axios
      .get("http://localhost:5000/api/admin/beneficiaries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setBeneficiaries(res.data))
      .catch((err) => console.error("Error fetching beneficiaries:", err));
  };

  const handleVerify = (id) => {
    axios
      .put(`http://localhost:5000/api/admin/beneficiaries/${id}/verify`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => fetchBeneficiaries())
      .catch((err) => console.error("Verification failed:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/admin/beneficiaries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => fetchBeneficiaries())
      .catch((err) => console.error("Delete failed:", err));
  };

  const filtered = beneficiaries.filter((b) =>
    b.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bank_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Beneficiary Oversight</h2>

      <input
        type="text"
        placeholder="Search by name or bank"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
      />

      {filtered.length === 0 ? (
        <p>No beneficiaries found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Account Number</th>
              <th>Bank</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user_id}</td>
                <td>{b.full_name}</td>
                <td>{b.account_number}</td>
                <td>{b.bank_name}</td>
                <td>{b.verified ? "Yes" : "No"}</td>
                <td>
                  {!b.verified && (
                    <button onClick={() => handleVerify(b.id)}>Verify</button>
                  )}
                  <button onClick={() => handleDelete(b.id)} style={{ marginLeft: "0.5rem" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
=======
import React from 'react';

function BeneficiaryOversight() {
  // Dummy beneficiary data
  const beneficiaries = [
    {
      id: 1,
      user: 'John Doe',
      beneficiaryName: 'Alice Brown',
      phone: '+254712345678',
      addedOn: '2025-04-01',
      status: 'Active',
    },
    {
      id: 2,
      user: 'Jane Smith',
      beneficiaryName: 'David Kimani',
      phone: '+254711234567',
      addedOn: '2025-04-10',
      status: 'Inactive',
    },
    {
      id: 3,
      user: 'Michael Lee',
      beneficiaryName: 'Grace Wambui',
      phone: '+254700112233',
      addedOn: '2025-04-15',
      status: 'Active',
    },
  ];

  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-semibold mb-4">Beneficiary Oversight</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">User</th>
            <th className="border px-4 py-2 text-left">Beneficiary</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Added On</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((b) => (
            <tr key={b.id}>
              <td className="border px-4 py-2">{b.id}</td>
              <td className="border px-4 py-2">{b.user}</td>
              <td className="border px-4 py-2">{b.beneficiaryName}</td>
              <td className="border px-4 py-2">{b.phone}</td>
              <td className="border px-4 py-2">{b.addedOn}</td>
              <td
                className={`border px-4 py-2 font-medium ${
                  b.status === 'Active' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {b.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> cc66e7e21a48dc17ae0b2a6093f0e3e7ab708deb
    </div>
  );
}

export default BeneficiaryOversight;
