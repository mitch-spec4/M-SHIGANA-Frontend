import axios from 'axios';

export const fetchNotifications = async () => {
  try {
    const response = await axios.get('/api/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.put(`/api/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    await axios.delete(`/api/notifications/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};