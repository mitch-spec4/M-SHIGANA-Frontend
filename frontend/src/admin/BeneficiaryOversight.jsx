import { useEffect, useState } from "react";
import axios from "axios";

function BeneficiaryOversight() {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/beneficiaries")
      .then((res) => setBeneficiaries(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Beneficiaries</h2>
      <ul>
        {beneficiaries.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BeneficiaryOversight;
