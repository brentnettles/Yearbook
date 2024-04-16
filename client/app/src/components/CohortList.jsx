import React from 'react';
import { useLoaderData, useOutletContext, Link } from 'react-router-dom';


//Only using this to fetch and link for StudentDetails


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
            <Link to={`/yearbook/${cohort.id}`}>{cohort.location}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}