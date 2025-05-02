import { useEffect, useState } from "react";

export default function BeneficiariesPage() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", bank: "", account: "" });
    const [editingId, setEditingId] = useState(null);

    // Fetch beneficiaries from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/beneficiaries")
            .then((res) => res.json())
            .then((data) => setBeneficiaries(data))
            .catch((err) => console.error("Failed to load beneficiaries:", err));
    }, []);

    const filtered = beneficiaries.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddOrUpdate = () => {
        const url = editingId
            ? `http://localhost:5000/api/beneficiaries/${editingId}`
            : "http://localhost:5000/api/beneficiaries";

        const method = editingId ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((saved) => {
                if (editingId) {
                    setBeneficiaries((prev) =>
                        prev.map((b) => (b.id === editingId ? saved : b))
                    );
                } else {
                    setBeneficiaries((prev) => [...prev, saved]);
                }
                setShowForm(false);
                setFormData({ name: "", email: "", bank: "", account: "" });
                setEditingId(null);
            });
    };

    const handleEdit = (b) => {
        setFormData(b);
        setEditingId(b.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this beneficiary?")) {
            fetch(`http://localhost:5000/api/beneficiaries/${id}`, { method: "DELETE" })
                .then(() => setBeneficiaries((prev) => prev.filter((b) => b.id !== id)));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">My Beneficiaries</h1>

            <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="border p-2 rounded w-full max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => {
                        setShowForm(true);
                        setFormData({ name: "", email: "", bank: "", account: "" });
                    }}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Add New
                </button>
            </div>

            <div className="space-y-4">
                {filtered.map((b) => (
                    <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">{b.name}</h3>
                            <p className="text-sm text-gray-600">{b.email}</p>
                            <p className="text-sm text-gray-600">{b.bank} – {b.account}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(b)} className="text-blue-600">✏️ Edit</button>
                            <button onClick={() => handleDelete(b.id)} className="text-red-600">🗑️ Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Edit Beneficiary" : "Add Beneficiary"}
                        </h2>

                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Bank Name"
                                className="w-full border p-2 rounded"
                                value={formData.bank}
                                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Account Number or Wallet ID"
                                className="w-full border p-2 rounded"
                                value={formData.account}
                                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => setShowForm(false)} className="text-gray-500">Cancel</button>
                            <button onClick={handleAddOrUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">
                                {editingId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
