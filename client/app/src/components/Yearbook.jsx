import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link

export default function Yearbook() {
  const students = useLoaderData();

  if (!students) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container yearbook-gallery">
      {students.map(student => (
        <div key={student.id} className="yearbook-item card">
          <Link to={`/student/${student.id}`}> {/* Make the entire card clickable */}
            <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} className="yearbook-image" />
            <h3>{student.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
