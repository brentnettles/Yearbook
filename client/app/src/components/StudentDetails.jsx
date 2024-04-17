import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
                setSignatures(data.signatures || []); // Initialize signatures with the fetched data or an empty array
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleNewSignature = (newSignature) => {
        setSignatures([...signatures, newSignature]); // Append the new signature to the current list
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!student) return <p>No student found.</p>;

    return (
        <div className="student-details-container">
            <button onClick={() => navigate(`/yearbook/${student.cohort_id}`)}>Back to Yearbook</button>
            <h2>Student Details for {student.name}</h2>
            <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Quote:</strong> {student.quote}</p>
            <div className="yearbook-sigs">
                <h3>Signatures</h3>
                <ul>
                    {signatures.map((signature, index) => (
                        <li key={index}>{signature.message}</li>
                    ))}
                </ul>
                <SignatureForm studentId={student.id} onNewSignature={handleNewSignature} />
            </div>
        </div>
    );
};

export default StudentDetails;
