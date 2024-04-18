import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Yearbook = () => {
    const [cohortName, setCohortName] = useState('');
    const [students, setStudents] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cohortId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchYearbookData = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/yearbook/${cohortId}`);
                if (!response.ok) throw new Error('Failed to fetch yearbook data');
                const data = await response.json();
                setCohortName(data.cohortName);
                setStudents(data.students);
                setInstructors(data.instructors);  
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
    if (students.length === 0 && instructors.length === 0) return <p>No students or instructors found for this cohort.</p>;

    return (
        <div className="yearbook-container">
        <div className="header-container">
            <div className="cohort-name">{cohortName}</div>
            <div className="instructors-row">
                {instructors.map(instructor => (
                    <div key={instructor.id} className="yearbook-item instructor" onClick={() => navigate(`/instructor-card/${instructor.id}`)}>
                        <img src={`http://127.0.0.1:5555${instructor.img}`} alt={instructor.name} className="yearbook-image" />
                        <p>{instructor.name}</p>
                        <p className="quote">{instructor.quote}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="yearbook-gallery">
            {students.map(student => (
                <div key={student.id} className="yearbook-item" onClick={() => navigate(`/student-card/${student.id}`)}>
                    <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} className="yearbook-image" />
                    <p>{student.name}</p>
                    <p className="quote">{student.quote}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Yearbook;
