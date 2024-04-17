import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Yearbook = () => {
    const [cohortName, setCohortName] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cohortId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchYearbookData = async () => {
            try {
                // Fetch cohort name and students data
                const response = await fetch(`http://localhost:5555/api/yearbook/${cohortId}`);
                if (!response.ok) throw new Error('Failed to fetch yearbook data');
                const data = await response.json();
                setCohortName(data.cohortName);
                setStudents(data.students);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchYearbookData();
    }, [cohortId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (students.length === 0) return <p>No students found for this cohort.</p>;

    return (
        <div>
            <h1 className="cohort-name">{cohortName}</h1>
            <div className="yearbook-gallery">
                {students.map(student => (
                    <div key={student.id} className="yearbook-item" onClick={() => navigate(`/student-card/${student.id}`)}>
                        <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} className="yearbook-image" />
                        <p>{student.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Yearbook;
