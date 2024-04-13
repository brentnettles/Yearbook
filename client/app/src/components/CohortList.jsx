import React from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';

export default function CohortList() {
  const [user] = useOutletContext();
  const cohorts = useLoaderData();

  if (!user || !user.username) {
    return <p>Must be logged in to view this page</p>;
  }

  return (
    <>
      <h2>All Cohorts</h2>
      <ul>
        {cohorts.map(cohort => (
          <li key={cohort.id}>
            <a href={`/yearbook/${cohort.id}`}>{cohort.location}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
