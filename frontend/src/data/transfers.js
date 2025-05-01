import axios from 'axios';

export const fetchBankTransfers = async () => {
  try {
    const response = await axios.get('/api/bank-transfers');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank transfers:', error);
    return [];
  }
};

export const fetchScheduledTransfers = async () => {
  try {
    const response = await axios.get('/api/scheduled-transfers');
    return response.data;
  } catch (error) {
    console.error('Error fetching scheduled transfers:', error);
    return [];
  }
};