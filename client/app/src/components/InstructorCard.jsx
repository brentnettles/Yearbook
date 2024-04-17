import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InstructorCard = () => {
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { instructorId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/instructor/${instructorId}`);
                if (!response.ok) throw new Error('Failed to fetch instructor details');
                const data = await response.json();
                setInstructor(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructor();
    }, [instructorId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!instructor) return <p>No instructor found.</p>;

    const handleCardClick = (e) => {
        e.stopPropagation();  // Prevents the overlay click from firing when the card is clicked
    };

    const handleOverlayClick = () => {
        navigate(-1);  // Navigates back to the previous page
    };

    return (
        <div className="card-overlay" onClick={handleOverlayClick}>
            <div className="detail-card" onClick={handleCardClick}>
                <img src={`http://127.0.0.1:5555${instructor.img}`} alt={instructor.name} />
                <div>
                    <h2>{instructor.name}</h2>
                    <p> "{instructor.quote}"</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
