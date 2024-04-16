import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SignatureForm from './SignatureForm'; // Ensure path is correct

export default function StudentDetails() {
  const student = useLoaderData();
  const [signatures, setSignatures] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (student && student.signatures) {
      setSignatures(student.signatures);
    }
  }, [student]);

  const handleNewSignature = (newSignature) => {
    setSignatures([...signatures, newSignature]);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('details-overlay')) {
      // Navigate back to the specific yearbook page using cohort ID
      navigate(`/yearbook/${student.cohort_id}`);
    }
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  const imageUrl = `http://127.0.0.1:5555${student.img}`;

  return (
    <div className="details-overlay" onClick={handleOverlayClick}>
      <div className="student-details-card" onClick={(e) => e.stopPropagation()}>
        <h2>Student Details</h2>
        <img src={imageUrl} alt={student.name} className="student-image" />
        <p>Name: {student.name}</p>
        <p>Quote: {student.quote}</p>
        <div className="student-signatures">
          <h3>Signatures:</h3>
          <ul>
            {signatures.map((signature, index) => (
              <li key={index}>{signature.message}</li>
            ))}
          </ul>
        </div>
        <SignatureForm studentId={student.id} onNewSignature={handleNewSignature} />
      </div>
    </div>
  );
}
