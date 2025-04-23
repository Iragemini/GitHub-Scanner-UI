import { useState, useEffect } from 'react';
import config from '../config';

/**
 * Custom React hook to fetch and manage the list of repositories.
 *
 * This hook handles data fetching, loading state, and error handling for the repositories.
 * It fetches data once on initial mount using the configured API endpoint.
 *
 * @returns {Object} An object containing:
 *   - repositories {Array}: The list of fetched repositories.
 *   - loading {boolean}: Indicates if the fetch is in progress.
 *   - error {string|null}: Error message if the fetch fails.
 *   - setError {Function}: Function to manually update the error state.
 */
export const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.repos}`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepositories();
  }, []);

  return { repositories, loading, error, setError };
};