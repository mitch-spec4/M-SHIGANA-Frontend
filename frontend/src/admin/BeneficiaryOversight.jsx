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
    </div>
  );
}

export default BeneficiaryOversight;
