import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

export default function Yearbook() {
  const students = useLoaderData();

  if (!students) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>Yearbook</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}> {/* Ensure this matches the expected router parameter */}
              <img src={`http://127.0.0.1:5555${student.img}`} alt={student.name} />
              <span>{student.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
