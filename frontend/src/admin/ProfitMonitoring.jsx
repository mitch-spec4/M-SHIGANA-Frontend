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
// import './ProfitMonitoring.css';

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