import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CohortList = () => {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/cohorts');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setCohorts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCohorts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <>
        <h2>All Cohorts</h2>
        <ul>
          {cohorts.map(cohort => (
            <li key={cohort.id}>
              <Link to={`/yearbook/${cohort.id}`}>{cohort.location}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }

export default CohortList;
