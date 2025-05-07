// ProfitMonitoring.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './ProfitMonitoring.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfitMonitoring = () => {
  const [profitData, setProfitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    groupBy: 'day'
  });
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchProfitData();
  }, [filters]);

  const fetchProfitData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      params.append('groupBy', filters.groupBy);

      const response = await fetch(`/api/admin/profit?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch profit data');
      
      const data = await response.json();
      setProfitData(data);
      
      // Calculate total profit
      const total = data.reduce((sum, item) => sum + item.profit, 0);
      setTotalProfit(total);
    } catch (error) {
      console.error('Error fetching profit data:', error);
      alert('Failed to load profit data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Chart data configuration
  const chartData = {
    labels: profitData.map(item => item.date),
    datasets: [
      {
        label: 'Profit ($)',
        data: profitData.map(item => item.profit),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Profit Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return (
    <div className="profit-monitoring-container">
      <h2>Profit Monitoring</h2>
      
      <div className="summary-card">
        <h3>Total Profit</h3>
        <p className="profit-amount">${totalProfit.toFixed(2)}</p>
        <p className="profit-period">
          {filters.startDate || 'All time'} to {filters.endDate || 'now'}
        </p>
      </div>
      
      <div className="filters">
        <div className="filter-group">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Group By:</label>
          <select
            name="groupBy"
            value={filters.groupBy}
            onChange={handleFilterChange}
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
        <button onClick={fetchProfitData} disabled={loading}>
          {loading ? 'Loading...' : 'Apply Filters'}
        </button>
      </div>
      
      <div className="chart-container">
        {profitData.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="no-data">
            {loading ? 'Loading data...' : 'No profit data available for selected period'}
          </div>
        )}
      </div>
      
      <div className="transactions-table">
        <h3>Detailed Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {profitData.length > 0 ? (
              profitData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>${item.profit.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitMonitoring;