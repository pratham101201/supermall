import { useState, useEffect } from 'react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.request(endpoint, options);
        setData(result);
      } catch (err) {
        setError(err.message);
        if (options.showError !== false) {
          toast.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.request(endpoint, options);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export const useShops = () => {
  return useApi('/shops');
};

export const useProducts = (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  return useApi(`/products${queryString ? `?${queryString}` : ''}`);
};

export const useOffers = () => {
  return useApi('/offers');
};