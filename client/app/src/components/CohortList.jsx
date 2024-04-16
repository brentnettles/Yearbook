import React from 'react';
import { useLoaderData, useOutletContext, Link } from 'react-router-dom';


//Only using this to fetch and link for StudentDetails


export default function CohortList() {
  const cohorts = useLoaderData() || [];  // Default to an empty array if no data

  return (
    <>
      <h2>All Cohorts</h2>
      <ul>
        {cohorts.map(cohort => (
          <li key={cohort.id}>
            <Link to={`/yearbook/${cohort.id}`}>{cohort.location}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}