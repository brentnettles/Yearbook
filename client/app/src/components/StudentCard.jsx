import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function StudentCard() {
  const student = useLoaderData();
  const navigate = useNavigate();

  if (!student) {
    return <p>Loading...</p>;
  }

  const handleCardClick = (e) => {
    e.stopPropagation(); // Prevent click propagation to the parent overlay
    navigate(`/student-details/${student.id}`);
  };

  const handleOverlayClick = () => {
    navigate(`/yearbook/${student.cohort_id}`);
  };

  return (
    <div className="card-overlay" onClick={handleOverlayClick}>
      <div className="student-card" onClick={handleCardClick}>
        <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
        <div>
          <h2>{student.name}</h2>
          <p>Quote: {student.quote}</p>
        </div>
      </div>
    </div>
  );
}
