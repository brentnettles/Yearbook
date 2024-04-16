import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SignatureForm from './SignatureForm';

export default function StudentDetails() {
  const student = useLoaderData();
  const [signatures, setSignatures] = useState(student.signatures || []);
  const navigate = useNavigate();

  const handleNewSignature = (newSignature) => {
    setSignatures([...signatures, newSignature]);
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="student-details-container">
      <button onClick={() => navigate(`/yearbook/${student.cohort_id}`)}>Back to Yearbook</button>
      <h2>Student Details for {student.name}</h2>
      <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Quote:</strong> {student.quote}</p>
      <div>
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
}