import axios from 'axios';

export const fetchBeneficiaries = async () => {
  try {
    const response = await axios.get('/api/beneficiaries');
    return response.data;
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    return [];
  }
};

export const createBeneficiary = async (beneficiaryData) => {
  try {
    const response = await axios.post('/api/beneficiaries', beneficiaryData);
    return response.data;
  } catch (error) {
    console.error('Error creating beneficiary:', error);
    throw error;
  }
};

export const updateBeneficiary = async (id, beneficiaryData) => {
  try {
    const response = await axios.put(`/api/beneficiaries/${id}`, beneficiaryData);
    return response.data;
  } catch (error) {
    console.error('Error updating beneficiary:', error);
    throw error;
  }
};

export const deleteBeneficiary = async (id) => {
  try {
    await axios.delete(`/api/beneficiaries/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting beneficiary:', error);
    return false;
  }
};