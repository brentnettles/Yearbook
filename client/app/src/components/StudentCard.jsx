import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function StudentCard() {
  const student = useLoaderData();
  const navigate = useNavigate();

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card-overlay" onClick={() => navigate(`/yearbook/${student.cohort_id}`)}>
      <div className="student-card" onClick={(e) => e.stopPropagation()}>
        <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
        <div>
          <h2>{student.name}</h2>
          <p>Quote: {student.quote}</p>
        </div>
      </div>
    </div>
  );
}