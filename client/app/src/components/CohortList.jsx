import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CohortList = () => {
    const [cohorts, setCohorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('start_date'); // Default sorting by start date

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

    // Filter and sort cohorts based on search term and sort by option
    const sortedCohorts = cohorts
        .filter(cohort =>
            cohort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cohort.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cohort.start_date.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'start_date') {
                return new Date(b.start_date) - new Date(a.start_date);
            }
            // Add more sorting options if needed
        });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="cohort-list">
            <h2>All Cohorts</h2>
            {/* Search input for filtering cohorts */}
            <input
                type="text"
                placeholder="Search cohorts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            {/* Sort by option */}
            <select value={sortBy} onChange={handleSortChange} className="sort-select">
                <option value="start_date">Sort by Start Date (Newest to Oldest)</option>
                {/* Add more sorting options if needed */}
            </select>
            {/* Render cohorts in a table */}
            <table className="cohort-table">
                <thead>
                    <tr>
                        <th>Yearbook</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCohorts.map(cohort => (
                        <tr key={cohort.id} className="cohort-row">
                            <td className="yearbook-link">
                                <Link to={`/yearbook/${cohort.id}`}>Yearbook</Link>
                            </td>
                            <td className="cohort-name">{cohort.name}</td>
                            <td className="cohort-start-date">{cohort.start_date}</td>
                            <td className="cohort-location">{cohort.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CohortList;
