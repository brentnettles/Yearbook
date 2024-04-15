import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Yearbook() {
  const { students, cohortName } = useLoaderData();

  if (!students) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="cohort-name">{cohortName}</h1>
      <div className="yearbook-gallery">
        {students.map((student) => (
          <div key={student.id} className="yearbook-item">
            <a href={`/student-card/${student.id}`}> {/* Change to navigate to StudentCard page */}
              <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} className="yearbook-image" />
              <p>{student.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
