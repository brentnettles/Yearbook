import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/CreateUserContext';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import CohortList from './components/CohortList';
import Yearbook from './components/Yearbook';
import StudentDetails from './components/StudentDetails';
import StudentCard from './components/StudentCard';
import InstructorCard from './components/InstructorCard';
import SignatureForm from './components/SignatureForm';
import ErrorPage from './components/ErrorPage';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="cohorts" element={<CohortList />} />
            <Route path="yearbook/:cohortId" element={<Yearbook />} />
            <Route path="student-card/:studentId" element={<StudentCard />} />
            <Route path="instructor-card/:instructorId" element={<InstructorCard />} />
            <Route path="student-details/:studentId" element={<StudentDetails />} />
            <Route path="signatures/new" element={<SignatureForm />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
