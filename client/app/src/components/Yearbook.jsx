import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link

export default function Yearbook() {
  const { students, cohortName } = useLoaderData();

  if (!students) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="cohort-name">{cohortName}</h1>
      <div className="yearbook-gallery">
        {students.map(student => (
          <div key={student.id} className="yearbook-item">
            {/* Wrap the image and name in a Link to the StudentDetails page */}
            <Link to={`/student/${student.id}`}>
              <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
              <p>{student.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
