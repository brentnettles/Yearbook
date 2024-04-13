import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import SignatureForm from './SignatureForm'; // Make sure the path is correct

export default function StudentDetails() {
  const student = useLoaderData();
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    // Initialize signatures with existing data from the student, if available
    if (student && student.signatures) {
      setSignatures(student.signatures);
    }
  }, [student]);

  // Handler to update signatures state upon successful submission
  const handleNewSignature = (newSignature) => {
    setSignatures([...signatures, newSignature]);
  };

  if (!student) {
    return <p>Loading...</p>;
  }

  const imageUrl = `http://127.0.0.1:5555${student.img}`;

  return (
    <>
      <h2>Student Details</h2>
      <img src={imageUrl} alt={student.name} />
      <p>Name: {student.name}</p>
      <p>Quote: {student.quote}</p>
      <div>
        <h3>Signatures:</h3>
        <ul>
          {signatures.map((signature, index) => (
            <li key={index}>{signature.message}</li>
          ))}
        </ul>
      </div>
      <SignatureForm studentId={student.id} onNewSignature={handleNewSignature} />
    </>
  );
}
