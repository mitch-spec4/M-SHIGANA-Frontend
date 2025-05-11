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
    </div>
  );
}

export default BeneficiaryOversight;
