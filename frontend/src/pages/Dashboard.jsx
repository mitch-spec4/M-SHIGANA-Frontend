import React, { useEffect, useState } from 'react';
import { fetchBankTransfers, fetchScheduledTransfers } from '../data/transfers';
import { fetchBeneficiaries } from '../data/beneficiaries';
import { fetchNotifications } from '../data/notifications';

const Dashboard = () => {
  const [bankTransfers, setBankTransfers] = useState([]);
  const [scheduledTransfers, setScheduledTransfers] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bankData = await fetchBankTransfers();
      const scheduledData = await fetchScheduledTransfers();
      const beneficiariesData = await fetchBeneficiaries();
      const notificationsData = await fetchNotifications();
      setBankTransfers(bankData);
      setScheduledTransfers(scheduledData);
      setBeneficiaries(beneficiariesData);
      setNotifications(notificationsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Bank Transfers</h2>
        <ul>
          {bankTransfers.map((transfer) => (
            <li key={transfer.id}>{transfer.details}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Scheduled Transfers</h2>
        <ul>
          {scheduledTransfers.map((transfer) => (
            <li key={transfer.id}>{transfer.details}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Beneficiaries</h2>
        <ul>
          {beneficiaries.map((beneficiary) => (
            <li key={beneficiary.id}>{beneficiary.full_name} - {beneficiary.bank_name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;