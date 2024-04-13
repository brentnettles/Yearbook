import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function StudentDetails() {
  const student = useLoaderData();

  if (!student) {
    return <p>Loading...</p>;
  }

  // Assuming your Flask server is running on http://127.0.0.1:5555
  const imageUrl = `http://127.0.0.1:5555${student.img}`;

  return (
    <>
      <h2>Student Details</h2>
      <img src={imageUrl} alt={student.name} /> 
      <p>Name: {student.name}</p>
      <p>Quote: {student.quote}</p>
      <p>Signatures: {student.signatures}</p>
    </>
  );
}
