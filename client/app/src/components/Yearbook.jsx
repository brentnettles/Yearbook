import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';  // Import useNavigate

export default function Yearbook() {
  const { students, cohortName } = useLoaderData();
  const navigate = useNavigate();  // Initialize the navigate function

  if (!students || students.length === 0) {
    return <p>No students found for this cohort.</p>;
  }

  return (
    <div>
      <h1 className="cohort-name">{cohortName}</h1>
      <div className="yearbook-gallery">
        {students.map(student => (
          <div key={student.id} className="yearbook-item" onClick={() => navigate(`/student-card/${student.id}`)}>
            <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} className="yearbook-image" />
            <p>{student.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
