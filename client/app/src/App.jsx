import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useUserContext } from './components/CreateUserContext';

const App = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
      // Redirect to login if no user is found
      if (!user) {
          navigate('/login');
      }
  }, [user, navigate]);

  return (
      <>
          <NavBar />
          {user ? (
              <Outlet />  // This should render the nested routes when user is present
          ) : (
              <p>Please log in to view this page.</p>
          )}
      </>
  );
};

export default App;




// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import { useUserContext } from './components/CreateUserContext';

// const App = () => {
//     const { user } = useUserContext();
//     const navigate = useNavigate();

//     React.useEffect(() => {
//         // Redirect to login if no user is found
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     return (
//         <>
//             <NavBar />
//             {user ? (
//                 <Outlet />
//             ) : (
//                 <p>Please log in to view this page.</p>
//             )}
//         </>
//     );
// };

// export default App;
