// src/components/AuditLogs.jsx
import React, { useState, useEffect } from 'react';
import './AuditLogs.css';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    action: '',
    userId: ''
  });
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.action) params.append('action', filters.action);
      if (filters.userId) params.append('userId', filters.userId);

      const response = await fetch(`/api/audit/logs?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add JWT token
        }
      });
 
};

export default AuditLogs;