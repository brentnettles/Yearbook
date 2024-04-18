import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SignatureForm from './SignatureForm'; // Ensure this is the correct import path

const StudentDetails = () => {
    const [student, setStudent] = useState(null);
    const [signatures, setSignatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { studentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:5555/api/student/${studentId}`);
                if (!response.ok) throw new Error('Failed to fetch student details');
                const data = await response.json();
                setStudent(data);
                setSignatures(data.received_signatures || []); // Use the updated key for signatures
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleNewSignature = (newSignature) => {
        setSignatures(prevSignatures => [...prevSignatures, newSignature]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!student) return <p>No student found.</p>;

    return (
        <div className="details-container">
            <button className="back-button" onClick={() => navigate(`/yearbook/${student.cohort_id}`)}>Back to Yearbook</button>
            <div className="student-image-container">
                <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
                <p></p>
                <a href={`${student.img}`} download={`${student.name}_Yearbook_Photo.jpg`}>Download Photo</a>
            </div>
            <div className="signatures-container">
                <div>
                    <h2>{student.name}</h2>
                    <p>{student.quote}</p>
                </div>
                <div className="signatures-list">
    <h3>Signatures:</h3>
    <ul>
            {signatures.map((signature, index) => (
            <li key={index}>
                {signature.message} - 
                <strong>
                    <Link to={`/student-details/${signature.author_id}`}>{signature.author}</Link>
                </strong>
            </li>
        ))}

    </ul>
</div>
                <SignatureForm studentId={student.id} onNewSignature={handleNewSignature} />
            </div>
        </div>
    );
    
};

export default StudentDetails;
