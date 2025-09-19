import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (method, url, data = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const config = {
        method,
        url,
        ...(data && { data }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const response = await axios(config);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getApi = (url) => apiCall('GET', url);
  const postApi = (url, data) => apiCall('POST', url, data);
  const putApi = (url, data) => apiCall('PUT', url, data);
  const deleteApi = (url) => apiCall('DELETE', url);

  return {
    loading,
    error,
    getApi,
    postApi,
    putApi,
    deleteApi,
  };
};

export default useApi;