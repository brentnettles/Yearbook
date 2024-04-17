import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentCard = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { studentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/student/${studentId}`);
                if (!response.ok) throw new Error('Failed to fetch student data');
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!student) return <p>No student found.</p>;

    const handleCardClick = (e) => {
        e.stopPropagation(); // Prevent click propagation to the parent overlay
        navigate(`/student-details/${student.id}`);
    };

    const handleOverlayClick = () => {
        navigate(`/yearbook/${student.cohort_id}`);
    };

    return (
        <div className="card-overlay" onClick={handleOverlayClick}>
            <div className="student-card" onClick={handleCardClick}>
                <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
                <div>
                    <h2>{student.name}</h2>
                    <p>Quote: {student.quote}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
