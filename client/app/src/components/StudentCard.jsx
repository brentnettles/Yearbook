import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function StudentCard() {
  const student = useLoaderData();
  const navigate = useNavigate();

  if (!student) {
    return <p>Loading...</p>;
  }

  const imageUrl = `http://127.0.0.1:5555${student.img}`;

  return (
    <div className="card-overlay" onClick={() => navigate(`/yearbook/${student.cohort_id}`)}>
      <div className="student-card" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={student.name} className="student-image" onClick={() => navigate(`/student-details/${student.id}`)} />
        <p>{student.name}</p>
        <p>Quote: {student.quote}</p>
      </div>
    </div>
  );
}
